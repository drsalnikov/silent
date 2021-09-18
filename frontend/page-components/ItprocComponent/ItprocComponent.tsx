import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { ItprocForm, Htag } from '../../components';
import { ItFactorReduction } from '..';
import cn from 'classnames';
import styles from './ItprocComponent.module.css';


export const Itproc = (itproc: IProc): JSX.Element => {

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h1'>{"ИТ процесс"}</Htag>
			</div>
			<ItprocForm
				ID={itproc.ID}
				Level={itproc.Level}
				RTO={itproc.RTO}
				Name={itproc.Name} />
		</div>
	);
}