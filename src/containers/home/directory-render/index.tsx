import React from 'react';
import styled from 'styled-components';
import Entry from '../../../models/entry';

import EntryItem from './entry-item';

const Main = styled.main`
	min-width: 100%;
	min-height: 100%;
	overflow-y: auto;
`;

const DirectoryName = styled.h1`
`;

const EntriesContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

type DirectoryRenderProps = React.PropsWithoutRef<{
	entry: Entry<'directory'>,
}>;

type DirectoryRenderComponent = React.FunctionComponent<DirectoryRenderProps>;

const DirectoryRender: DirectoryRenderComponent = ({ entry }) => {
	if (!entry.subentries) throw new Error('Tried to render unexplored directory!');

	return (
		<Main>
			<DirectoryName>{entry.name}</DirectoryName>
			<EntriesContainer>
				{entry.subentries.map(entry => (
					<EntryItem entry={entry} key={entry.name} />
				))}
			</EntriesContainer>
		</Main>
	);
}

export default DirectoryRender;