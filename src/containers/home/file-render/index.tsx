import React from 'react';
import styled from 'styled-components';
import Entry from '../../../models/entry';
import Text from './text';
import Video from './video';

const Root = styled.div`
	width: 100%;
	height: 50%;
	display: grid;
	grid-template-rows: max-content auto;
`;

const Name = styled.p`
	margin: 0;
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
`;

type FileRenderProps = React.PropsWithoutRef<{
	entry: Entry
}>;

type FileRenderComponent = React.FunctionComponent<FileRenderProps>;

const FileRender: FileRenderComponent = ({ entry }) => {
	const extension = entry.path.ext;

	function renderContent () {
		if (extension === '.webm') {
			return <Video entry={entry} mimeType={'video/webm'} />
		} else {
			return <Text entry={entry} />;
		}
	}

	return (
		<Root>
			<Name>{entry.name}</Name>
			<Content>{renderContent()}</Content>
		</Root>
	);
}

export default FileRender;