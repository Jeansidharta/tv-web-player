import ParsedPath from "./path";

export type EntryTypes = 'directory' | 'file' | 'unknown';

type Entry<T extends EntryTypes = EntryTypes> = {
	type: T,
	name: string,
	path: ParsedPath,
	subentries: Entry[] | null,
}

export function isDirectoryEntry (entry: Entry): entry is Entry<'directory'> {
	return entry.type === 'directory';
}

export function isFileEntry (entry: Entry): entry is Entry<'file'> {
	return entry.type === 'file';
}

export default Entry;