import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IFactor, IFactors } from '../../interfaces/processes.interface';

export interface FactorFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	Name?: string;
	Type?: string;
}

