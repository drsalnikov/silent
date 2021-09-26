import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { ItprocForm, Htag, Card, P, Divider } from '../../components';
import cn from 'classnames';
import styles from './ItprocComponent.module.css';


export const Itproc = (): JSX.Element => {

	return (
		<Card>
			<Htag tag='h1'>{"Добавить ИТ-процесс"}</Htag>
			<Divider />
			<ItprocForm />
		</Card>
	);
}