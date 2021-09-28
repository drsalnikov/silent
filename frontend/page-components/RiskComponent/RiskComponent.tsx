import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { RiskForm, Htag, Card, P, Divider } from '../../components';
import cn from 'classnames';
import styles from './RiskComponent.module.css';
import { useRouter } from 'next/router';

export const Risk = (risk: IRisk): JSX.Element => {

	const router = useRouter();
	const { id } = router.query;

	return (
		<Card>
			<Htag tag='h1'>{"Добавить риск по ИТ-Процессу"}</Htag>
			<Divider />
			<RiskForm
				CITPROC={Number(id)}
				isNew={true} />
		</Card>
	);
}