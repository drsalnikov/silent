import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IProcesses, IFactor, IFactors } from '../../interfaces/processes.interface';

import { withLayout } from '../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag } from '../../components';
import cn from 'classnames';
import { ItFactorRisk } from '../../page-components'

function FactorPage({ data }: IFactors): JSX.Element {

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
		//router.push("factor/" + row.ID);
	};

	return (
		<>
			<Htag tag='h2'>Факторы рисков</Htag>
			<DataTable
				columns={columns}
				data={data}
				highlightOnHover
				pointerOnHover
				onRowClicked={onRowClick}
			/>
			<Divider />
		</>
	);
}

export default withLayout(FactorPage);

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
