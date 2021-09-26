import { FactorFormProps } from './FactorForm.props';
import { IFactorForm } from './FactorForm.interface';
import styles from './FactorForm.module.css';
import CloseIcon from './close.svg';
import cn from 'classnames';
import { Input, Textarea, Button, Htag, P } from '../index';
import { useForm, Controller } from 'react-hook-form';

import Select from 'react-select';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const FactorForm = ({ className, ...props }: FactorFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IFactorForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IFactorForm) => {
		const res = await axios.post(API.factor.post, { ...formData });

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
					{...register('Name', { required: { value: true, message: 'Наименование фактора' } })}
					placeholder='Наименование фактора'
					error={errors.Name}
					className={styles.description}
					aria-invalid={errors.Name ? true : false}
				/>
				<Input
					{...register('Type', { required: { value: true, message: 'Тип' } })}
					placeholder='Тип'
					error={errors.Type}
					className={styles.description}
					aria-invalid={errors.Type ? true : false}
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
				{error}
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