const { Transform } = require('stream');

class DropboxUploadStream extends Transform {
	constructor(options, path, dropbox ,mainWindow, proyectId, name) {
		super(options);
		this.sessionId = null;
		this.offset = 0;
		this.path = path;
		this.dropbox = dropbox;
		this.mainWindow = mainWindow;
		this.proyectId = proyectId;
		this.filename = name;
	}

	_transform(chunk, encoding, next) {
		console.log('Write: ', chunk.byteLength / 1024 + ' KB');
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
		console.log('SessionStart: Start');
		this.dropbox.filesUploadSessionStart({
			close: false,
			contents: chunk
		})
		.then((response) => {
			console.log('SessionStart: End');
			this.sessionId = response.session_id;
			console.log(`Session id: ${response.session_id}`);
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
		console.log('SessionAppend: Start');
		this.dropbox.filesUploadSessionAppendV2({
			cursor: {
				session_id: this.sessionId,
				offset: this.offset
			},
			close: false,
			contents: chunk
		})
		.then(() => {
			console.log('SessionAppend: End');
			this.offset += chunk.byteLength;
			next();
		}, next);
	}

	/**
	 * Closes the session and commits the file(s)
	 *
	 * @param next
	 */
	sessionFinish(next) {
		console.log('SessionFinish: Start', this.offset);
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
			console.log('SessionFinish: End');

			this.mainWindow.webContents.send('endUploadFile');

			this.dropbox.sharingCreateSharedLinkWithSettings({
				"path": uploadFile.path_lower,
				"settings": {
						"requested_visibility": "public"
				}
			}).then((linkCreatorResponse) => {


				this.mainWindow.webContents.send('shareLinkGenerate', {
					link: linkCreatorResponse.url.replace(/.$/,"1"),
					projectId: this.proyectId,
					filename: this.filename
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
