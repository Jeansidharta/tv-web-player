import { GetServerSidePropsContext } from 'next';
import Home from '../../containers/home';
import customGetServerSideProps from '../../containers/home/getServerSideProps';

import { FsType, PathType } from '../../models/node-types';

export async function getServerSideProps (context: GetServerSidePropsContext) {
	const fs = require('fs').promises as FsType;
	const path = require('path')  as PathType;

	return customGetServerSideProps({ fs, path }, context);
}

export default Home;