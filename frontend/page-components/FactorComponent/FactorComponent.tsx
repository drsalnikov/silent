import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { ReductionForm, Htag, Divider } from '../../components';
import styles from './FactorComponent.module.css';
import { IFactorComponentProps } from './FactorComponent.props';
import cn from 'classnames';
import { FactorForm, Card } from '../../components';
import { useRouter } from 'next/router';

export const Factor = (): JSX.Element => {

	return (
		<Card className={styles.wrapper}>
			<Htag tag='h1'>{"Добавить фактор"}</Htag>
			<Divider />
			<FactorForm />
		</Card>
	);
}