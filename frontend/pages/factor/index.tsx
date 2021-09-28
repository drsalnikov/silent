import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IProcesses, IFactor, IFactorsData } from '../../interfaces/processes.interface';
import { withLayout } from '../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag, Card, P } from '../../components';
import cn from 'classnames';

function AllFactorPage({ dataFactors }: IFactorsData): JSX.Element {

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
				data={dataFactors}
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

export const getStaticProps: GetStaticProps<IFactorsData> = async () => {

	const { data: dataFactors } = await axios.get<IFactor[]>(API.factor.get);

	if (!dataFactors) {
		return {
			notFound: true
		};
	}

	return {
		props: { dataFactors },
		revalidate: Number(process.env.revalidate) || 30
	};
};
