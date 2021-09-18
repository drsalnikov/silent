import { ItprocFormProps } from './ItprocForm.props';
import styles from './ItprocForm.module.css';
import CloseIcon from './close.svg';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import { Htag } from '../Htag/Htag';
import { useForm, Controller } from 'react-hook-form';
import { IprocForm, ItprocSentResponse } from './ItprocForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ItprocForm = ({ ID, Level, RTO, Name, className, ...props }: ItprocFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IprocForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IprocForm) => {

		try {
			const { data } = await axios.post<ItprocSentResponse>(API.itproc.post, { ...formData });
			setIsSuccess(true);
			reset();
		} catch (e: any) {
			setError(e.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input
					{...register('Name', { required: { value: true, message: 'Наименование' } })}
					placeholder='Имя'
					error={errors.Name}
					className={styles.description}
					aria-invalid={errors.Name ? true : false}
				/>
				<Input
					{...register('RTO', { required: { value: true, message: 'РТО' } })}
					placeholder='RTO'
					error={errors.RTO}
					className={styles.description}
					aria-invalid={errors.RTO ? true : false}
				/>
				<Input
					{...register('Level', { required: { value: true, message: 'Уровень критичности' } })}
					placeholder='Level'
					className={styles.description}
					error={errors.Level}
					aria-invalid={errors.Level ? true : false}
				/>
				<Textarea
					{...register('Description', { required: { value: true, message: 'Заполните описание' } })}
					placeholder='Описание'
					className={styles.description}
					error={errors.Description}
					aria-label='Описание'
					aria-invalid={errors.Level ? true : false}
				/>
				<div className={styles.submit}>
					<Button appearance="primary" onClick={() => clearErrors()}>Сохранить</Button>
					<span className={styles.info}>*</span>
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