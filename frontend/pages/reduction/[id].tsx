import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IRisk, IRisks, IFactorRisk, IFactorRisks } from '../../interfaces/processes.interface';

import { withLayout } from '../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag, P } from '../../components';
import cn from 'classnames';
import { ItFactorRisk } from '../../page-components'

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
		}
	];

	const router = useRouter();

	const onButtonClick = () => {
		//router.push("new");
	};

	return (
		<>
			<Htag tag='h2'>{`ИТ-процесс: ${process?.Name}`}</Htag>
			<P>{`Риск: ${risk?.Name}`}</P>
			<DataTable
				columns={columns}
				data={dataFactorRisks}
				highlightOnHover
				pointerOnHover
			/>
			<Divider />
			<div>
				<Button onClick={onButtonClick} appearance='primary'>Добавить</Button>
			</div>
		</>
	);
}

export default withLayout(FactorRiskPage);

export const getServerSideProps: GetStaticProps<IFactorRisks> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

	if (!params) {
		return {
			notFound: true
		};
	};

	const { data: dataRisks } = await axios.get<IRisk[]>(API.risk.id + params.id);
	const risk: IRisk | undefined = dataRisks.shift();

	if (!risk) {
		return {
			notFound: true
		};
	};

	const { data: dataProcess } = await axios.get<IProc[]>(API.itproc.id + risk?.CITPROC);
	const { data: dataFactorRisks } = await axios.get<IFactorRisk[]>(API.factorRisk.byRisk + params.id);

	const process: IProc | undefined = dataProcess.shift();

	return {
		props: { process, risk, dataFactorRisks }
	};
};
