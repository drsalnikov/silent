import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IFactor, IFactors } from '../../interfaces/processes.interface';

export interface FactorRiskFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	CRISK: number;
	data: IFactor[]
}

