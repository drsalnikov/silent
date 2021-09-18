import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { Button, Divider, Htag } from '../../components';
import { ItFactorReduction } from '../../page-components';
import cn from 'classnames';
import styles from './ItFactorRiskComponent.module.css';

export const ItFactorRisk = ({ data }: any): JSX.Element => {

	const columns = [
		{
			name: 'ID',
			selector: row => row.ID,
		},
		{
			name: 'Наименование риска',
			selector: row => row.Name,
		},
		{
			name: 'Ущерб',
			selector: row => row.Damage,
		}
	];

	return (
		<div className={styles.wrapper}>
			<DataTable
				className={styles.table}
				title={"Факторы риска по ИТ процессу " + data.Name}
				columns={columns}
				data={data.Risk}
				highlightOnHover
				pointerOnHover
				dense
				expandableRows
				expandableRowsComponent={ItFactorReduction}
			/>
		</div>

	);
}