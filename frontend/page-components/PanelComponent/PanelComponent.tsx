import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { RiskForm, Htag, Card, P, Divider, Button } from '../../components';
import cn from 'classnames';
import styles from './PanelComponent.module.css';
import { useRouter } from 'next/router';
import { IPanelComponentProps } from './PanelComponent.props';

export const Panel = ({ buttons }: IPanelComponentProps): JSX.Element => {
	let id = 0;
	return (
		<div className={styles.wrapper}>
			{buttons.map(b => <Button key={(++id).toString()} appearance={b.appearance} onClick={b.action}>{b.text}</Button>)}
		</div>
	);
}