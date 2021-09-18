import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IRisk, IRisks, IFactorRisk, IFactorRisks } from '../../../../../../interfaces/processes.interface';

import { withLayout } from '../../../../../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../../../../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag } from '../../../../../../components';
import cn from 'classnames';
import { ItFactorRisk } from '../../../../../../page-components'

function FactorRiskPage({ process, risk, dataFactorRisks }: IFactorRisks): JSX.Element {

	const columns = [
		{
			name: 'Наименование фактора',
			selector: row => row.Name,
			wrap: true,
			width: '60%'
		},
		{
			name: 'Тип',
			selector: row => row.Type,
		},
		{
			name: 'Группа',
			selector: row => row.Set,
		},
		{
			name: 'Вероятность',
			selector: row => row.Percent,
		},
		{
			name: 'Действия'
		}
	];

	const router = useRouter();

	const onRowClick = (row: IFactorRisk) => {
		//router.push(`itprocesses/${row.ID}/risk`);
	};

	const onButtonClick = () => {
		//router.push("new");
	};

	return (
		<>
			<DataTable
				title={`ИТ процесс: ${process?.Name} \ Риск: ${risk?.Name}`}
				columns={columns}
				data={dataFactorRisks}
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

export default withLayout(FactorRiskPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];

	const { data: dataProcess } = await axios.get<IProc[]>(API.itproc.get);
	const { data: dataRisks } = await axios.get<IRisk[]>(API.risk.get);

	//dataProcess.map(proc => {
	//	dataRisks
	//		.filter(r => r.CITPROC == proc.ID)
	//		.map(risk => paths.push(`/itprocesses/${proc.ID}/risk/${risk.ID}`));
	//});

	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<IFactorRisks> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

	if (!params) {
		return {
			notFound: true
		};
	};

	const { data: dataProcess } = await axios.get<IProc[]>(API.itproc.id + params.id);
	const { data: dataRisks } = await axios.get<IRisk[]>(API.risk.id + params.idrisk);
	const { data: dataFactorRisks } = await axios.get<IFactorRisk[]>(API.factorRisk.byRisk + params.idrisk);

	const process: IProc | undefined = dataProcess.shift();
	const risk: IRisk | undefined = dataRisks.shift();

	return {
		props: { process, risk, dataFactorRisks }
	};
};
