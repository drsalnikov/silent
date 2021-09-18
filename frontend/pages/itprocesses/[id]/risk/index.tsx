import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetServerSideProps } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IRisk, IRisks } from '../../../../interfaces/processes.interface';

import { withLayout } from '../../../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag } from '../../../../components';
import cn from 'classnames';
import { ItFactorRisk } from '../../../../page-components'

function RiskPage({ process, dataRisks }: IRisks): JSX.Element {

	const columns = [
		{
			name: 'Наименование риска',
			selector: row => row.Name,
			wrap: true,
			width: '60%'
		},
		{
			name: 'Ущерб',
			selector: row => row.Damage,
		},
		{
			name: 'Действия'
		}
	];

	const router = useRouter();
	const { id, idrisk } = router.query;

	const onRowClick = (row: IRisk) => {
		//`itprocesses/${id}/risk/${idrisk}/factor`

		router.push('itprocesses');
	};

	const onButtonClick = () => {
		//router.push("new");
	};

	return (
		<>
			<DataTable
				title={`Риски по процессу ${process?.Name}`}
				columns={columns}
				data={dataRisks}
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

export default withLayout(RiskPage);

/*
export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	const { data } = await axios.get<IRisk[]>(API.risk.get);

	data.map(i => {
		paths.push(`/itprocesses/${i.CITPROC}/risk`);
	});
	console.log(data);

	return {
		paths,
		fallback: true
	};
};
*/

export const getServerSideProps: GetStaticProps<IRisks> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

	if (!params) {
		return {
			notFound: true
		};
	};

	const { data: dataProcess } = await axios.get<IProc[]>(API.itproc.id + params.id);
	const { data: dataRisks } = await axios.get<IRisk[]>(API.risk.byProcess + params.id);

	const process: IProc | undefined = dataProcess.shift();

	return {
		props: { process, dataRisks }
	};
};
