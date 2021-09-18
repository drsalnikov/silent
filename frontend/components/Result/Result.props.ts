import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ResultProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    Summa?: string;
}