const url = require('url');
const fs = require('fs');

module.exports = (req, resp) => {
	const gzip = (req['accept-encoding'] || '').split(/\s+/).includes('gzip');

	const headers = {
		'content-type': 'text/html; charset=utf-8',
	}

	if (gzip) {
		headers['content-encoding'] = 'gzip';
	}

	resp.writeHead(200, headers);

	if (gzip) {
		fs.createReadStream('./index.html.gz').pipe(resp);
	} else {
		fs.createReadStream('./index.html').pipe(resp);
	}
}