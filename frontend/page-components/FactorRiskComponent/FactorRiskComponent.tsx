import React from 'react';
import { IProc, IProcesses, IRisk } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { FactorRiskForm, Htag, Divider } from '../../components';
import styles from './FactorRiskComponent.module.css';
import { IFactorRiskComponentProps } from './FactorRiskComponent.props';
import cn from 'classnames';
import { Card } from '../../components';
import { useRouter } from 'next/router';

export const FactorRisk = ({ data }: IFactorRiskComponentProps): JSX.Element => {

	const router = useRouter();
	const { id } = router.query;

	return (
		<Card className={styles.wrapper}>
			<Htag tag='h1'>{"Добавить фактор риска"}</Htag>
			<Divider />
			<FactorRiskForm data={data} CRISK={Number(id)} />
		</Card>
	);
}