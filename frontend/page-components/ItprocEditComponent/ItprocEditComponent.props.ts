import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ItprocEditFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    ID: number;
    Name: string;
    RTO: number;
    Level: string;
}

export interface ItprocComponentProps {

}
