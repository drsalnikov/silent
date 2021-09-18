import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { Button, Divider, Htag } from '../../components';
import { ItFactorReduction } from '..';
import cn from 'classnames';
import styles from './RiskComponent.module.css';

export const Risk = ({ data }: any): JSX.Element => {

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
				title={"Риски по ИТ процессу " + data.Name}
				columns={columns}
				data={data.Risk}
				highlightOnHover
				pointerOnHover
				dense
				expandableRows
				expandableRowsComponent={ItFactorRisk}
			/>
		</div>

	);
}