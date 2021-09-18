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

export const Result = ({ className, ...props }: ResultProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm();
	const [summa, setSumma] = useState<string>("");
	const [riskBefore, setRiskBefore] = useState<string>("");
	const [riskAfter, setRiskAfter] = useState<string>("");
	const [result, setResult] = useState<IResult[]>([]);

	const columns = [
		{
			name: 'Наименование мероприятия',
			selector: row => row.Name,
			wrap: true
		},
		{
			name: 'Стоимость',
			selector: row => row.Cost,
		},
		{
			name: 'Эффективность',
			selector: row => row.Economy,
		}
	];

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key == 'Enter') {
			handleSubmit(onSubmit)();
		}
	};

	const onSubmit = async (formData: IResultForm) => {
		try {
			const { data } = await axios.get<IResult[]>(API.calc.get + summa);
			setResult(data);
			setRiskBefore(data[0]?.StartRisk);
			setRiskAfter(data[0]?.FinalRisk);
			reset();
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
							placeholder="Рассчет..."
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
			</div>
			<div className={cn(className, styles.result)}>
				<DataTable
					columns={columns}
					data={result}
					highlightOnHover
					pointerOnHover
				/>
				<Divider />
				<P>Текущий риск: {riskBefore}</P>
				<P>Риск после выполнения мероприятий: {riskAfter}</P>
			</div>
		</div>
	);
};