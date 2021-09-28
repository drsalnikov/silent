import React from 'react';
import { IProc, IProcesses, IRisk, IFactors } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { FactorRiskForm, Htag, Divider } from '../../components';
import styles from './FactorRiskComponent.module.css';
import { IFactorRiskComponentProps } from './FactorRiskComponent.props';
import cn from 'classnames';
import { Card } from '../../components';
import { useRouter } from 'next/router';

export const FactorRisk = ({ risk, dataFactors }: IFactors): JSX.Element => {

	return (
		<Card className={styles.wrapper}>
			<Htag tag='h1'>{"Добавить фактор риска"}</Htag>
			<Divider />
			<FactorRiskForm
				dataFactors={dataFactors}
				CRISK={risk?.ID}
				isNew={true} />
		</Card>
	);
}