import { ButtonProps } from '../../components/Button/Button.props';

export interface IPanelComponentProps {
    buttons: IButton[]
}

interface IButton {
    text: string;
    appearance: 'primary' | 'ghost' | 'warning';
    action(): void
}

