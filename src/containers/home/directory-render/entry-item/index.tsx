import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';

import Entry from '../../../../models/entry';

const Root = styled.div`
	padding: 1rem;
	border-radius: 12px;
	box-shadow: ${(props) => props.theme.shadows.button.medium.normal};
	cursor: pointer;
`;

const Name = styled.p`
	margin: 0;
`;

const Type = styled.p`
	margin: 0;
`;

type EntryItemProps = React.PropsWithoutRef<{
	entry: Entry,
}>;

type EntryItemComponent = React.FunctionComponent<EntryItemProps>;

const EntryItem: EntryItemComponent = ({ entry }) => {
	const pathRef = (entry.path.full).replace(/\\/g, '/');

	return (
		<Link href={pathRef}>
			<a>
				<Root>
					<Name>{ entry.name }</Name>
					<Type>{ entry.type }</Type>
				</Root>
			</a>
		</Link>
	);
}

export default EntryItem;