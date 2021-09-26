import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IRisk, IRisks, IFactorRisk, IFactorRisks, IReductions, IReduction } from '../../interfaces/processes.interface';

import { withLayout } from '../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag, P, Card } from '../../components';
import cn from 'classnames';
import { Panel } from '../../page-components';

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

	const router = useRouter();

	const onButtonAddReductionkClick = () => {
		router.push(`/new/reduction/${factorrisk?.ID}`);
	};

	const onButtonEditClick = () => {

	};

	const onButtonDeleteClick = () => {

	};

	return (
		<Card>
			<Htag tag='h1'>{`Фактор по данному риску: ${factorrisk?.Name}`}</Htag>
			<Divider />
			<P size='m'>{`ИТ-процесс: ${process?.Name}`}</P>
			<Divider />
			<P size='m'>{`Риск: ${risk?.Name}`}</P>
			<Divider />
			<P size='m'>{`Мероприятия:`}</P>
			<Divider />
			<DataTable
				columns={columns}
				data={dataReduction}
			/>
			<Divider />
			<Panel buttons={[
				{ text: 'Добавить мероприятия', appearance: 'primary', action: onButtonAddReductionkClick },
				{ text: 'Изменить', appearance: 'ghost', action: onButtonEditClick },
				{ text: 'Удалить', appearance: 'warning', action: onButtonDeleteClick }
			]} />
		</Card>
	);
}

export default withLayout(ReductionPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	const { data } = await axios.get<IFactorRisk[]>(API.factorRisk.get);

	data.map(i => {
		paths.push(`/factorrisk/${i.ID}`);
	});

	return {
		paths,
		fallback: true
	};
};


export const getStaticProps: GetStaticProps<IReductions> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

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

	const { data: dataProcess } = await axios.get<IProc[]>(API.itproc.id + risk?.CITPROC);
	const process: IProc | undefined = dataProcess.shift();

	const { data: dataReduction } = await axios.get<IReduction[]>(API.reduction.byfactorRisk + params.id);

	return {
		props: { process, risk, factorrisk, dataReduction }
	};
};
