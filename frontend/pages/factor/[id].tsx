import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { IProc, IProcesses, IFactor, IFactors, IFactorCard, IActivity, IActivities } from '../../interfaces/processes.interface';
import { withLayout } from '../../layout/Layout';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import { Button, Divider, Htag, Card, P } from '../../components';
import cn from 'classnames';

function FactorPage({ factor, activities }: IFactorCard): JSX.Element {

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

	const onButtonClick = () => {
		router.push(`/new/activity/${factor.ID}`);
	};

	return (
		<Card>
			<Htag tag='h1'>{`Фактор ${factor.Name}`}</Htag>
			<Divider />
			<P size='m'>{`Мероприятия:`}</P>
			<Divider />
			<DataTable
				columns={columns}
				data={activities}
				pointerOnHover
			/>
			<Divider />
		</Card>
	);
}

export default withLayout(FactorPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	const { data } = await axios.get<IFactor[]>(API.factor.get);

	data.map(i => {
		paths.push(`/factor/${i.ID}`);
	});

	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<IFactorCard> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

	if (!params) {
		return {
			notFound: true
		};
	};

	const { data: factors } = await axios.get<IFactor[]>(API.factor.id + params.id);
	const { data: activities } = await axios.get<IActivity[]>(API.activity.byFactor + params.id);

	const factor: IFactor = factors[0];

	return {
		props: { factor, activities }
	};
};
