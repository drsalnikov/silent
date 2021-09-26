import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IProcesses, IFactor, IFactors } from '../../interfaces/processes.interface';
import { withLayout } from '../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag, Card, P } from '../../components';
import cn from 'classnames';

function AllFactorPage({ data }: IFactors): JSX.Element {

	const columns = [
		{
			name: 'Наименование фактора',
			selector: row => row.Name,
			wrap: true,
			width: "70%"
		},
		{
			name: 'Тип',
			selector: row => row.Type,
		}
	];

	const router = useRouter();

	const onRowClick = (row: IFactor) => {
		router.push(`/factor/${row.ID}`);
	};

	const onButtonClick = () => {
		router.push(`/new/factor`);
	};

	return (
		<Card>
			<Htag tag='h1'>Факторы</Htag>
			<Divider />
			<DataTable
				columns={columns}
				data={data}
				highlightOnHover
				pointerOnHover
				onRowClicked={onRowClick}
			/>
			<Divider />
			<div>
				<Button onClick={onButtonClick} appearance='primary'>Добавить</Button>
			</div>
		</Card>
	);
}

export default withLayout(AllFactorPage);

export const getStaticProps: GetStaticProps<IFactors> = async () => {

	const { data } = await axios.get<IFactor[]>(API.factor.get);

	if (!data) {
		return {
			notFound: true
		};
	}

	return {
		props: { data }
	};
};
