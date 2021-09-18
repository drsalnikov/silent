import { GetStaticProps } from 'next';
import React from 'react';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { API } from '../../helpers/api';
import { Button, Divider, Htag, Result } from '../../components';


function ResultPage(): JSX.Element {

	return (
		<>
			<Htag tag='h2'>Рассчет</Htag>
			<Result />
		</>
	);
}

export default withLayout(ResultPage);
