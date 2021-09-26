import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IFactor, IFactors, IActivity } from '../../interfaces/processes.interface';

export interface ReductionFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	CFACTORRISK: number;
	data: IActivity[]
}

