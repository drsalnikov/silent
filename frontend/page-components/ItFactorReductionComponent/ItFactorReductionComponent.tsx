import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import cn from 'classnames';
import styles from './ItFactorReductionComponent.module.css';

export const ItFactorReduction = ({ data }: any): JSX.Element => {

	const columns = [
		{
			name: 'ID',
			selector: row => row.ID,
		},
		{
			name: 'Мероприятие',
			selector: row => row.Name,
		},
		{
			name: 'Новая вероятность фактора',
			selector: row => row.NewPercent,
		}
	];

	return (
		<div className={styles.wrapper}>
			<DataTable
				className={styles.table}
				title={"Мероприятия по фактору " + data.Name}
				columns={columns}
				data={data.Reduction}
				highlightOnHover
				pointerOnHover
				dense
			/>
		</div>

	);
}