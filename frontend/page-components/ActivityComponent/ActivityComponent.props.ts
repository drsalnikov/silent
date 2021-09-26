import { IActivity, IFactor, IFactors } from '../../interfaces/processes.interface';

export interface IActivityComponentProps {
    data: IFactor[]
}

interface ISelect {
    value: string;
    label: string;
}