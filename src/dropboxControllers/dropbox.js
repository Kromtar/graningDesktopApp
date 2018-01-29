const { Transform } = require('stream');

class DropboxUploadStream extends Transform {
	constructor(options, path, dropbox ,mainWindow, proyectId) {
		super(options);
		this.sessionId = null;
		this.offset = 0;
		this.path = path;
		this.dropbox = dropbox;
		this.mainWindow = mainWindow;
		this.projectId = proyectId;
	}

	_transform(chunk, encoding, next) {
		this.mainWindow.webContents.send('newChunkUpdate', chunk.byteLength / 1024);

		if (!this.sessionId) {
			return this.sessionStart(chunk, next);
		}

		this.sessionAppend(chunk, next);
	}

	_flush(next) {
		this.sessionFinish(next);
	}

	/**
	 * Starts a dropbox session
	 *
	 * @param chunk
	 * @param next
	 */
	sessionStart(chunk, next) {
		this.dropbox.filesUploadSessionStart({
			close: false,
			contents: chunk
		})
		.then((response) => {
			this.sessionId = response.session_id;
			this.offset += chunk.byteLength;
			return next();
		}, next);
	}

	/**
	 * Appends data to an open dropbox session
	 *
	 * @param chunk
	 * @param next
	 */
	sessionAppend(chunk, next) {
		this.dropbox.filesUploadSessionAppendV2({
			cursor: {
				session_id: this.sessionId,
				offset: this.offset
			},
			close: false,
			contents: chunk
		})
		.then(() => {
			this.offset += chunk.byteLength;
			next();
		}, next);
	}

	sessionFinish(next) {
		this.dropbox.filesUploadSessionFinish({
			"cursor": {
				"session_id": this.sessionId,
				"offset": this.offset
			},
			"commit": {
				"path": this.path,
				"mode": "overwrite",
				"autorename": false,
				"mute": false
			}
		})
		.then((uploadFile) => {
			this.mainWindow.webContents.send('endUploadFile');

			this.dropbox.sharingCreateSharedLinkWithSettings({
				"path": uploadFile.path_lower,
				"settings": {
						"requested_visibility": "public"
				}
			}).then((linkCreatorResponse) => {


				this.mainWindow.webContents.send('shareLinkGenerate', {
					link: linkCreatorResponse.url.replace(/.$/,"1"),
					projectId: this.projectId
				});

			}).catch(function(err){
				console.log('Erorr generando link', err);
				this.mainWindow.webContents.send('fileUpdateError');
			});

			this.sessionId = null;
			this.offset = 0;
			next();

		}, next).catch((err) =>{
			console.log('Erorr subiendo fichero', err);
			this.mainWindow.webContents.send('fileUpdateError');
		});
	}
}

module.exports = DropboxUploadStream;
