import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IProcesses, IFactor, IFactors, IActivity, IActivities } from '../../interfaces/processes.interface';

import { withLayout } from '../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag } from '../../components';
import cn from 'classnames';
import { ItFactorRisk } from '../../page-components'

function ActivityPage({ data }: IActivities): JSX.Element {

	const columns = [
		{
			name: 'Наименование мероприятия',
			selector: row => row.Name,
			wrap: true,
			width: "70%"
		},
		{
			name: 'Стоимость',
			selector: row => row.Summa,
		},
		{
			name: 'Статус',
			selector: row => row.IsActive,
		}
	];

	const router = useRouter();

	const onRowClick = (row: IActivity) => {
		//router.push("factor/" + row.ID);
	};

	return (
		<>
			<Htag tag='h2'>Мероприятия</Htag>
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

export default withLayout(ActivityPage);

export const getStaticProps: GetStaticProps<IActivities> = async () => {

	const { data } = await axios.get<IActivity[]>(API.activity.get);

	if (!data) {
		return {
			notFound: true
		};
	}

	return {
		props: { data }
	};
};
