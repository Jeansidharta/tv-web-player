import { NextApiRequest, NextApiResponse } from "next";
import BASE_PATH from '../../constants/base-content-path';

import fs from 'fs';
import path from 'path';
import process from 'process';


export default async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(process.pid);
	const queryPath = req.query.path as string;
	const filePath = path.join(BASE_PATH, queryPath);

	const range = req.headers.range as string;

	if (!range) {
		// 216 Wrong Range
		res.status(216).end();
		return;
	}

	const fileStat = await fs.promises.stat(filePath).catch(error => { res.status(404).write(error) });
	if (!fileStat) return;

	const positions = range.replace(/bytes=/, "").split("-");
	const start = Number(positions[0]);
	const total = fileStat.size;
	const end = positions[1] ? Number(positions[1]) : total - 1;
	const chunksize = (end - start) + 1;

	res.writeHead(206, {
		'Content-Range': `bytes ${start}-${end}/${total}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': chunksize,
		'Content-Type': 'video/webm',
	});

	return new Promise((resolve, reject) => {
		const fileStream = fs.createReadStream(filePath, { start, end });
		fileStream.on('open', () => {
			fileStream.pipe(res);
		});
		fileStream.on('error', (error) => {
			res.end(error);
			reject(error);
		});
		fileStream.on('end', () => {
			resolve();
		});
	});
}