const url = require('url');
const fs = require('fs');
const path = require('path');

module.exports = (req, resp) => {
	const gzip = (req.headers['accept-encoding'] || '').split(/\s+/).includes('gzip');

	const headers = {
		'content-type': 'text/html; charset=utf-8',
	}

	if (gzip) {
		headers['content-encoding'] = 'gzip';
	}

	resp.writeHead(200, headers);

	if (gzip) {
		fs.createReadStream(
			path.resolve(__dirname, 'index.html.gz')
		).pipe(resp);
	} else {
		fs.createReadStream(
			path.resolve(__dirname, 'index.html')
		).pipe(resp);
	}
}