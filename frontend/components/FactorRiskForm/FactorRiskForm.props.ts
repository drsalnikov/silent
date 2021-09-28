import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IFactor, IFactors } from '../../interfaces/processes.interface';

export interface FactorRiskFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	ID?: number;
	CFACTOR?: number;
	CRISK: number;
	Name?: string;
	Type?: string;
	Set?: number;
	Percent?: number;
	dataFactors: IFactor[];
	isNew: boolean;
}

