import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { RiskForm, Htag } from '../../components';
import { ItFactorReduction } from '..';
import cn from 'classnames';
import styles from './RiskComponent.module.css';
import { useRouter } from 'next/router';

export const Risk = (itproc: IProc): JSX.Element => {

	const router = useRouter();
	const { id } = router.query;

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h1'>{"Добавить риск по ИТ-Процессу"}</Htag>
			</div>
			<RiskForm
				CITPROC={id} />
		</div>
	);
}