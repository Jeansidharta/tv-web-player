import Head from 'next/head'
import ImageURLs from '../../images';
import { InferGetServerSidePropsType } from 'next';
import { HomeServerSideProps } from './getServerSideProps';
import DirectoryRender from './directory-render';
import { isDirectoryEntry, isFileEntry } from '../../models/entry';

/**
* Visit https://schema.org/docs/full.html for a list of all types to put here
*/
// TODO - change this
const JSONLD = `{
	"@context": "http://schema.org/",
	"@type": "Thing",
	"name": "your site thing",
	"image": "${ImageURLs.logoPng}"
}`;

export default function Home (props: InferGetServerSidePropsType<HomeServerSideProps>) {
	const { entry } = props;

	function renderContent () {
		if (isDirectoryEntry(entry)) {
			return <DirectoryRender entry={entry} />;
		} else if (isFileEntry(entry)) {
			return <>Cannot render file yet!</>
		} else throw new Error('Invalid entry type!');
	}

	return (
		<>
			<Head>
				<title>My Home Page Title</title>
				{/* TODO - add real url */}
				<link rel="canonical" href="https://my-domain.com/home"/>

				{/* This is json-ld with schema data */}
				<script type='application/ld+json'>{JSONLD}</script>
			</Head>
			{renderContent()}
		</>
	)
}