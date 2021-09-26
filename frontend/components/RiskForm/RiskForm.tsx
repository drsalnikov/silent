import { RiskFormProps } from './RiskForm.props';
import { IRiskForm } from './RiskForm.interface';
import styles from './RiskForm.module.css';
import CloseIcon from './close.svg';
import cn from 'classnames';
import { Input, Textarea, Button, Htag, P } from '../index';
import { useForm, Controller } from 'react-hook-form';

import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const RiskForm = ({ CITPROC, className, ...props }: RiskFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IRiskForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IRiskForm) => {
		const res = await axios.post(API.risk.post, { CITPROC, ...formData });
		if (res.status == 201) {
			setIsSuccess(true);
			reset();
		} else {
			setError(res.statusText);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input
					{...register('Name', { required: { value: true, message: 'Наименование риска' } })}
					placeholder='Наименование риска'
					error={errors.Name}
					className={styles.description}
					aria-invalid={errors.Name ? true : false}
				/>
				<Input type="number"
					{...register('Damage', { required: { value: true, message: 'Потенциальный ущерб' }, valueAsNumber: true })}
					placeholder='Потенциальный ущерб'
					error={errors.Damage}
					className={styles.description}
					aria-invalid={errors.Damage ? true : false}
				/>
				<div className={styles.submit}>
					<Button appearance="primary" onClick={() => clearErrors()}>Сохранить</Button>
				</div>
			</div>
			{isSuccess && <div className={cn(styles.success, styles.panel)} role="alert">
				<div className={styles.successTitle}>Запрос на добавление отправлен</div>
				<button
					onClick={() => setIsSuccess(false)}
					className={styles.close}
					aria-label="Закрыть оповещение"
				>
					<CloseIcon />
				</button>
			</div>}
			{error && <div className={cn(styles.error, styles.panel)} role="alert">
				Что-то пошло не так, попробуйте обновить страницу
				<button
					onClick={() => setError(undefined)}
					className={styles.close}
					aria-label="Закрыть оповещение"
				>
					<CloseIcon />
				</button>
			</div>}
		</form>
	);
};