import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IFactor, IFactors } from '../../interfaces/processes.interface';

export interface ActivityFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data: IFactor[]
}

