import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ItprocFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	ID?: number;
	Name?: string;
	RTO?: number;
	Level?: string;
}