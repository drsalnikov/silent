import { IActivity, IFactor, IFactors } from '../../interfaces/processes.interface';

export interface IReductionComponentProps {
    data: IActivity[]
}

interface ISelect {
    value: string;
    label: string;
}