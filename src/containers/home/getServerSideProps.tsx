import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Entry from "../../models/entry";
import { FsType, PathType } from "../../models/node-types";
import ParsedPath from "../../models/path";

const BasePath = 'D:\\torrents/';

async function readDirectoryContents (nodeLibs: { fs: FsType, path: PathType }, directoryPath: ParsedPath): Promise<Entry<'directory'>> {
	const { fs, path } = nodeLibs;

	const dir = await fs.opendir(path.join(BasePath, directoryPath.full));
	const entries: Entry[] = [];
	for await (const dirEnt of dir) {
		entries.push({
			name: dirEnt.name,
			type: dirEnt.isDirectory() ? 'directory' : dirEnt.isFile() ? 'file' : 'unknown',
			path: pathParse(path, path.join(directoryPath.full, dirEnt.name)),
			subentries: null,
		});
	}
	return {
		type: 'directory' as const,
		subentries: entries,
		name: directoryPath.name,
		path: directoryPath,
	};
}

function pathParse (pathLib: PathType, pathString: string): ParsedPath {
	const path = pathLib.parse(pathString);

	return {
		...path,
		full: pathLib.join(path.dir, path.base),
	};
}

type PropsResult = { entry: Entry };

const getServerSideProps = async (nodeLibs: { fs: FsType, path: PathType }, context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PropsResult>> => {
	const { fs, path } = nodeLibs;

	if (!context.params) throw new Error('Unexpected path');

	// Parses the query string into a comprehensible path
	const params = context.params.resource as string[];
	if (params[0] === 'home') params.shift();
	const fullPath = '/' + params.join('/');
	const queryStringPath = pathParse(path, fullPath);

	const stat = await fs.stat(path.join(BasePath, queryStringPath.full));

	if (stat.isDirectory()) {
		return { props: { entry: await readDirectoryContents({ fs, path }, queryStringPath) } };
	} else if (stat.isFile()){
		return {
			props: {
				entry: {
					type: 'file',
					name: queryStringPath.base,
					path: queryStringPath,
					subentries: null,
				},
			},
		};
	} else {
		throw new Error('Invalid path');
	}
}

export type HomeServerSideProps = GetServerSideProps<PropsResult>;

export default getServerSideProps;