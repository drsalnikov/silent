import { ResultProps } from './Result.props';
import { IResultForm, IResult } from './Result.interface';
import styles from './Result.module.css';
import { Button, Input, P, Divider } from '../index';
import { useState, useContext, KeyboardEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AppContext } from '../../context/app.context';
import { API } from '../../helpers/api';
import DataTable from 'react-data-table-component';
import cn from 'classnames';
import axios from 'axios';
import formatRelativeWithOptions from 'date-fns/fp/formatRelativeWithOptions/index';

export const Result = ({ className, ...props }: ResultProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm();
	const [summa, setSumma] = useState<string>("");
	const [pending, setPending] = useState(false);
	const [riskBefore, setRiskBefore] = useState<number>(0);
	const [riskAfter, setRiskAfter] = useState<number>(0);
	const [effect, setEffect] = useState<number>(0);
	const [result, setResult] = useState<IResult[]>([]);

	const columns = [
		{
			name: 'Наименование мероприятия',
			selector: row => row.Name,
			wrap: true,
			width: '60%'
		},
		{
			name: 'Стоимость',
			selector: row => row.Cost,
		}
	];

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key == 'Enter') {
			handleSubmit(onSubmit)();
		}
	};

	const onSubmit = async (formData: IResultForm) => {
		try {
			setPending(true);
			const { data } = await axios.get<IResult[]>(API.calc.get + summa);
			setResult(data);
			setRiskBefore(Math.round(Number(data[0]?.StartRisk) * 100) / 100);
			setRiskAfter(Math.round(Number(data[0]?.FinalRisk) * 100) / 100);
			setEffect(Math.round(Number(data[0]?.Economy) * 100) / 100);
			reset();
			setPending(false);
		} catch (e: any) {
			console.log(e.message);
		}
	};

	return (
		<div className={cn(className, styles.wrapper)}>
			<div className={cn(className, styles.params)}>
				<form onSubmit={handleSubmit(onSubmit)} className={cn(className, styles.search)} {...props} role="search">
					<div className={cn(className, styles.row)}>
						<P >Максимальный бюджет мероприятий</P>
						<Input
							className={styles.input}
							placeholder="Расчёт..."
							value={summa}
							onChange={(e) => setSumma(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<Button
							appearance="primary"
							className={styles.button}
							aria-label="Выполнить рассчет">Рассчитать
						</Button>
					</div>
				</form>
				<Divider />
			</div>
			<div className={cn(className, styles.result)}>
				<DataTable
					columns={columns}
					data={result}
					highlightOnHover
					pointerOnHover
					progressPending={pending}
				/>
				<Divider />
				<P>Текущий риск: {riskBefore.toLocaleString()} руб.</P>
				<P>Риск после выполнения мероприятий: {riskAfter.toLocaleString()} руб.</P>
				<P>Эффективность выполнения мероприятий: {effect.toLocaleString()} руб.</P>
			</div>
		</div>
	);
};