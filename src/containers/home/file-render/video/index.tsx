import React from 'react';
import styled from 'styled-components';
import Entry from '../../../../models/entry';

const Root = styled.video`
	width: 100%;
	height: 100%;
	display: block;
`;

type VideoProps = React.PropsWithoutRef<{
	entry: Entry,
	mimeType: string,
}>;

type VideoComponent = React.FunctionComponent<VideoProps>;

const Video: VideoComponent = ({ entry, mimeType }) => {
	const videoRef = React.useRef<HTMLVideoElement | null>(null);
	const filePath = '/api/file?path=' + entry.path.full;

	React.useEffect(() => {
		const videoElem = videoRef.current!;

		videoElem.addEventListener('loadeddata', () => {
			videoElem.play();
		});
	}, []);

	return (
		<Root controls ref={videoRef}>
			<source src={filePath} type={mimeType} />
		</Root>
	);
}

export default Video;