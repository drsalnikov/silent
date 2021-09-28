import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetServerSideProps } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IRisk, IRisks } from '../../interfaces/processes.interface';

import { withLayout } from '../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag, P, Card } from '../../components';
import { Panel } from '../../page-components';
import cn from 'classnames';

function ItprocPage({ itproc, dataRisks }: IRisks): JSX.Element {

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
		}
	];

	const router = useRouter();

	const onRowClick = (row: IRisk) => {
		router.push(`/risk/${row.ID}`);
	};

	const onButtonAddClick = () => {
		router.push(`/new/itprocesses`);
	};

	const onButtonAddRiskClick = () => {
		router.push(`/new/risk/${itproc?.ID}`);
	};

	const onButtonEditClick = () => {
		router.push(`/edit/itproc/${itproc?.ID}`);
	};

	const onButtonDeleteClick = async () => {
		const decision = confirm('Удалить ИТ-процесс и все связанные записи?');
		if (decision) {
			const res = await axios.delete<IProc[]>(API.itproc.delete + itproc?.ID);
			if (res.status == 200) {
				router.push(`/itprocesses`);
			} else {
				console.log(res);
			};
		}
	};

	return (
		<Card>
			<Htag tag='h1'>{`ИТ-процесс: ${itproc?.Name}`}</Htag>
			<Divider />
			<P size='l'>{`Риски:`}</P>
			<Divider />
			<DataTable
				columns={columns}
				data={dataRisks}
				highlightOnHover
				pointerOnHover
				onRowClicked={onRowClick}
			/>
			<Divider />
			<Panel buttons={[
				//{ text: 'Добавить ИТ-процесс', appearance: 'primary', action: onButtonAddClick },
				{ text: 'Добавить риск', appearance: 'primary', action: onButtonAddRiskClick },
				{ text: 'Изменить', appearance: 'ghost', action: onButtonEditClick },
				{ text: 'Удалить', appearance: 'warning', action: onButtonDeleteClick }
			]} />
		</Card>
	);
}

export default withLayout(ItprocPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	const { data } = await axios.get<IRisk[]>(API.risk.get);

	data.map(i => {
		paths.push(`/itproc/${i.CITPROC}`);
	});

	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<IRisks> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

	if (!params) {
		return {
			notFound: true
		};
	};

	const { data: dataProcess } = await axios.get<IProc[]>(API.itproc.id + params.id);
	const { data: dataRisks } = await axios.get<IRisk[]>(API.risk.byProcess + params.id);

	const itproc: IProc | undefined = dataProcess.shift();

	return {
		props: { itproc, dataRisks },
		revalidate: Number(process.env.revalidate) || 30
	};
};
