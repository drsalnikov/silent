import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { ReductionForm, Htag, Divider } from '../../components';
import styles from './ReductionComponent.module.css';
import { IReductionComponentProps } from './ReductionComponent.props';
import cn from 'classnames';
import { Card } from '../../components';
import { useRouter } from 'next/router';

export const Reduction = ({ data }: IReductionComponentProps): JSX.Element => {

	const router = useRouter();
	const { id } = router.query;

	return (
		<Card className={styles.wrapper}>
			<Htag tag='h1'>{"Добавить мероприятия к фактору риска"}</Htag>
			<Divider />
			<ReductionForm data={data} CFACTORRISK={Number(id)} />
		</Card>
	);
}