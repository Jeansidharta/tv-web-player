import React from 'react';
import styled from 'styled-components';
import Entry from '../../../models/entry';

const Root = styled.div`
`;

const Name = styled.p`
`;

const Content = styled.p`
`;

type FileRenderProps = React.PropsWithoutRef<{
	entry: Entry
}>;

type FileRenderComponent = React.FunctionComponent<FileRenderProps>;

const FileRender: FileRenderComponent = ({ entry }) => {
	const [fileContent, setFileContent] = React.useState<any>(null);

	async function fetchFile () {
		const response = await fetch('/api/file?path=' + entry.path.full);
		const body = await response.text();
		setFileContent(body);
	}

	React.useEffect(() => {
		fetchFile();
	}, []);

	return (
		<Root>
			<Name>{entry.name}</Name>
			<Content>{fileContent}</Content>
		</Root>
	);
}

export default FileRender;