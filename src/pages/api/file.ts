import { NextApiRequest, NextApiResponse } from "next";
import BASE_PATH from '../../constants/base-content-path';

import fs from 'fs';
import path from 'path';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const queryPath = req.query.path as string;

	const fileStream = fs.createReadStream(path.join(BASE_PATH, queryPath));

	return new Promise(resolve => {
		fileStream.on('data', chunk => res.write(chunk));
		fileStream.on('end', () => {
			res.end();
			resolve();
		});
	});
}