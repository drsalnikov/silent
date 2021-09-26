import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { ReductionForm, Htag, Divider, Card, ActivityForm } from '../../components';
import styles from './ActivityComponent.module.css';
import { IActivityComponentProps } from './ActivityComponent.props';
import cn from 'classnames';
import { useRouter } from 'next/router';

export const Activity = ({ data }: IActivityComponentProps): JSX.Element => {

	return (
		<Card className={styles.wrapper}>
			<Htag tag='h1'>{"Добавить мероприятия к фактору"}</Htag>
			<Divider />
			<ActivityForm data={data} />
		</Card>
	);
}