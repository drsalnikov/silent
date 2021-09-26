import { ActivityFormProps } from './ActivityForm.props';
import { IActivityForm } from './ActivityForm.interface';
import styles from './ActivityForm.module.css';
import CloseIcon from './close.svg';
import cn from 'classnames';
import { Input, Textarea, Button, Htag, P } from '../index';
import { useForm, Controller } from 'react-hook-form';

import Select from 'react-select';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ActivityForm = ({ data, className, ...props }: ActivityFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IActivityForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const [CFACTOR, setCFACTOR] = useState<number>();

	let id = 0;
	const options = data.map(elem => {
		return {
			id: (++id).toString(),
			value: elem.ID,
			label: elem.Name
		}
	});

	const onSubmit = async (formData: IActivityForm) => {
		const res = await axios.post(API.activity.post, { CFACTOR, ...formData });

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
					{...register('Name', { required: { value: true, message: 'Наименование мероприятия' } })}
					placeholder='Наименование мероприятия'
					error={errors.Name}
					className={styles.description}
					aria-invalid={errors.Name ? true : false}
				/>
				<Input type="number"
					{...register('Summa', { required: { value: true, message: 'Стоимость мероприятия' }, valueAsNumber: true })}
					placeholder='Стоимость мероприятия'
					error={errors.Summa}
					className={styles.description}
					aria-invalid={errors.Summa ? true : false}
				/>
				<Select
					className={styles.description}
					classNamePrefix="select"
					isLoading={false}
					isClearable={true}
					isSearchable={true}
					name="CFACTOR"
					placeholder='Факторы'
					options={options}
					onChange={(elem) => setCFACTOR(elem?.value)}
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