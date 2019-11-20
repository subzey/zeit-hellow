import { NowRequest, NowResponse } from '@now/node';
import { createReadStream } from 'fs';
import { resolve as resolvePath } from 'path';

export default (req: NowRequest, res: NowResponse) => {
	const gzip = /\bgzip\b/.test(req.headers['accept-encoding'] as string);

	const headers: Record<string, string> = {
		'content-type': 'text/html; charset=utf-8',
	}

	if (gzip) {
		headers['content-encoding'] = 'gzip';
	}

	res.writeHead(200, headers);

	if (gzip) {
		createReadStream(
			resolvePath(__dirname, 'index.html.gz')
		).pipe(res);
	} else {
		createReadStream(
			resolvePath(__dirname, 'index.html')
		).pipe(res);
	}
}
