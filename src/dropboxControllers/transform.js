const { Transform } = require('stream');

class TransformStream extends Transform {
	constructor(options) {
		super(options);
		this.chunkSize = options.chunkSize || 1 * 1024 * 1024; // 1 MB
	}

	checkBuffer(chunk) {
		if (!this.buffer) {
			this.buffer = Buffer.from(chunk);
		} else {
			this.buffer = Buffer.concat([this.buffer, chunk]);
		}

		return this.buffer.byteLength >= this.chunkSize
	};

	_transform(chunk, encoding, next) {
		if (!this.checkBuffer(chunk)) {
			return next();
		}

		next(null, this.buffer);
		this.buffer = undefined;
	}

	_flush(next) {
		next(null, this.buffer);
		this.buffer = undefined;
	}
}

module.exports = TransformStream;
