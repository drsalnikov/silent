import { GetStaticProps } from 'next';
import React from 'react';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Search(): JSX.Element {

	return (
		<>
			Search
		</>
	);
}

export default withLayout(Search);
