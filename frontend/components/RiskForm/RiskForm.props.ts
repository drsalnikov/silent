import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface RiskFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	CITPROC: string | string[] | undefined;
}

