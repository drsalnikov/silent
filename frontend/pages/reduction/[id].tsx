import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IRisk, IRisks, IFactorRisk, IFactorRisks, IReductions, IReduction } from '../../interfaces/processes.interface';

import { withLayout } from '../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag, P } from '../../components';
import cn from 'classnames';
import { ItFactorRisk } from '../../page-components'

function ReductionPage({ process, risk, factorrisk, dataReduction }: IReductions): JSX.Element {

	const columns = [
		{
			name: 'Наименование мероприятия',
			selector: row => row.Name,
			wrap: true,
			width: '60%'
		},
		{
			name: 'Стоимость',
			selector: row => row.Summa,
		},
		{
			name: 'Новая вероятность',
			selector: row => row.NewPercent,
		}
	];

	const onButtonClick = () => {
		//router.push("new");
	};

	return (
		<>
			<Htag tag='h2'>{`ИТ-процесс: ${process?.Name}`}</Htag>
			<Htag tag='h2'>{`Риск: ${risk?.Name}`}</Htag>
			<Htag tag='h2'>{`Фактор: ${factorrisk?.Name}`}</Htag>
			<DataTable
				columns={columns}
				data={dataReduction}
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

export default withLayout(ReductionPage);

export const getServerSideProps: GetStaticProps<IReductions> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

	if (!params) {
		return {
			notFound: true
		};
	};

	const { data: dataFactorrisk } = await axios.get<IFactorRisk[]>(API.factorRisk.id + params.id);
	const factorrisk: IFactorRisk | undefined = dataFactorrisk.shift();

	if (!factorrisk) {
		return {
			notFound: true
		};
	};

	const { data: dataRisks } = await axios.get<IRisk[]>(API.risk.id + factorrisk.CRISK);
	const risk: IRisk | undefined = dataRisks.shift();

	const { data: dataReduction } = await axios.get<IReduction[]>(API.reduction.byfactorRisk + params.id);

	const { data: dataProcess } = await axios.get<IProc[]>(API.itproc.id + risk?.CITPROC);
	const process: IProc | undefined = dataProcess.shift();

	return {
		props: { process, risk, factorrisk, dataReduction }
	};
};
