import React from 'react';
import styled from 'styled-components';
import Entry from '../../../../models/entry';

const Root = styled.p`
`;

type TextProps = React.PropsWithoutRef<{
	entry: Entry,
}>;

type TextComponent = React.FunctionComponent<TextProps>;

const Text: TextComponent = ({ entry }) => {
	const [fileContent, setFileContent] = React.useState<any>(null);
	const filePath = '/api/file?path=' + entry.path.full;

	async function fetchFileContent () {
		const response = await fetch(filePath);
		const body = await response.text();
		setFileContent(body);
	}

	React.useEffect(() => {
		fetchFileContent();
	}, []);

	return (
		<Root>
			{fileContent}
		</Root>
	);
}

export default Text;