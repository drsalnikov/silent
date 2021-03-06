import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IRisk, IRisks, IFactorRisk, IFactorRisks } from '../../interfaces/processes.interface';
import { withLayout } from '../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag, P, Card } from '../../components';
import cn from 'classnames';
import { Panel } from '../../page-components';

function FactorRiskPage({ itproc, risk, dataFactorRisks }: IFactorRisks): JSX.Element {

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

	const onRowClick = (row: IFactorRisk) => {
		router.push(`/factorrisk/${row.ID}`);
	};

	const onButtonAddRiskClick = () => {
		router.push(`/new/factorrisk/${risk?.ID}`);
	};

	const onButtonEditClick = () => {
		router.push(`/edit/risk/${risk?.ID}`);
	};


	const onButtonDeleteClick = async () => {
		const decision = confirm('Удалить риск и все связанные записи?');
		if (decision) {
			const res = await axios.delete<IProc[]>(API.risk.delete + risk?.ID);
			if (res.status == 200) {
				router.push(`/itproc/${itproc?.ID}`);
			} else {
				console.log(res);
			};
		}
	};

	return (
		<Card>
			<Htag tag='h1'>{`Риск: ${risk?.Name}`}</Htag>
			<Divider />
			<P size='l'>{`ИТ-процесс: ${itproc?.Name}`}</P>
			<Divider />
			<P size='l'>{`Факторы риска:`}</P>
			<Divider />
			<DataTable
				columns={columns}
				data={dataFactorRisks}
				highlightOnHover
				pointerOnHover
				onRowClicked={onRowClick}
			/>
			<Divider />
			<Panel buttons={[
				{ text: 'Добавить фактор риска', appearance: 'primary', action: onButtonAddRiskClick },
				{ text: 'Изменить', appearance: 'ghost', action: onButtonEditClick },
				{ text: 'Удалить', appearance: 'warning', action: onButtonDeleteClick }
			]} />
		</Card>
	);
}

export default withLayout(FactorRiskPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	const { data } = await axios.get<IRisk[]>(API.risk.get);

	data.map(i => {
		paths.push(`/risk/${i.ID}`);
	});

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

	const { data: dataRisks } = await axios.get<IRisk[]>(API.risk.id + params.id);
	const risk: IRisk | undefined = dataRisks.shift();

	if (!risk) {
		return {
			notFound: true
		};
	};

	const { data: dataProcess } = await axios.get<IProc[]>(API.itproc.id + risk?.CITPROC);
	const { data: dataFactorRisks } = await axios.get<IFactorRisk[]>(API.factorRisk.byRisk + params.id);

	const itproc: IProc | undefined = dataProcess.shift();

	return {
		props: { itproc, risk, dataFactorRisks },
		revalidate: Number(process.env.revalidate) || 30
	};
};
