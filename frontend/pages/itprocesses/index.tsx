import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';

import { withLayout } from '../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag } from '../../components';
import cn from 'classnames';
import { ItFactorRisk } from '../../page-components'

function ItprocessesPage({ data }: IProcesses): JSX.Element {

	const columns = [
		{
			name: 'Наименование процесса',
			selector: row => row.Name,
			wrap: true,
			width: '60%'
		},
		{
			name: 'RTO',
			selector: row => row.RTO,
		},
		{
			name: 'Уровень критичности',
			selector: row => row.Level,
		}
	];

	const router = useRouter();

	const onRowClick = (row: IProc) => {
		router.push(`risk/${row.ID}`);
	};

	const onButtonClick = () => {
		router.push(`/new/itprocesses`);
	};

	return (
		<>
			<Htag tag='h2'>ИТ процессы</Htag>
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
		</>
	);
}

export default withLayout(ItprocessesPage);

export const getStaticProps: GetStaticProps<IProcesses> = async () => {

	const { data } = await axios.get<IProc[]>(API.itproc.get);

	if (!data) {
		return {
			notFound: true
		};
	}

	return {
		props: { data }
	};
};
