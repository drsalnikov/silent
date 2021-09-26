import { IActivity, IFactor, IFactors } from '../../interfaces/processes.interface';

export interface IFactorComponentProps {
    data: IActivity[]
}

interface ISelect {
    value: string;
    label: string;
}