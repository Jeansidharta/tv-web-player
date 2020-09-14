/** This is returned by the `path.parse` function of the 'path' node package. */
type ParsedPath = {
	/**
	* The full path to the resource
	* @example 'C:\Path\To\Resource\resource.ext' -> 'C:\Path\To\Resource'
	*/
	dir: string,

	/**
	* The root directory of the resource.
	* @example 'C:\Path\To\Resource\resource.ext' -> 'C:\'
	*/
	root: string,

	/**
	* The name with the extension of the resource
	* @example 'C:\Path\To\Resource\resource.ext' -> 'resource.ext'
	*/
	base: string,

	/**
	* The name of the resource without the extension.
	* @example 'C:\Path\To\Resource\resource.ext' -> 'resource'
	*/
	name: string,

	/**
	* The extension of the resource.
	* @example 'C:\Path\To\Resource\resource.ext' -> '.ext'
	*/
	ext: string,

	/**
	* The full path to the resource.
	* @example 'C:\Path\To\Resource\resource.ext' -> 'C:\Path\To\Resource\resource.ext'
	*/
	full:
}

export default ParsedPath;