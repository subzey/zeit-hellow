const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
	const gzip = /\bgzip\b/.test(req.headers['accept-encoding']);

	const headers = {
		'content-type': 'text/html; charset=utf-8',
	}

	if (gzip) {
		headers['content-encoding'] = 'gzip';
	}

	res.writeHead(200, headers);

	if (gzip) {
		fs.createReadStream(
			path.resolve(__dirname, 'index.html.gz')
		).pipe(res);
	} else {
		fs.createReadStream(
			path.resolve(__dirname, 'index.html')
		).pipe(res);
	}
}
