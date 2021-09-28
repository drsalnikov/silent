import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface RiskFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	ID?: number;
	CITPROC: number;
	Name?: string;
	Damage?: string;
	isNew: boolean;
}

