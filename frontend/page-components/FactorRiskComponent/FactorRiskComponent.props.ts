import { IFactor, IFactors } from '../../interfaces/processes.interface';

export interface IFactorRiskComponentProps {
    data: IFactor[]
}

interface ISelect {
    value: string;
    label: string;
}