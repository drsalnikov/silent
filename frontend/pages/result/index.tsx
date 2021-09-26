import { GetStaticProps } from 'next';
import React from 'react';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { API } from '../../helpers/api';
import { Button, Divider, Htag, Result, Card } from '../../components';


function ResultPage(): JSX.Element {

	return (
		<Card>
			<Htag tag='h1'>Расчёт</Htag>
			<Result />
		</Card>
	);
}

export default withLayout(ResultPage);
