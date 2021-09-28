import { ReductionFormProps } from './ReductionFormprops';
import { IReductionForm } from './ReductionForm.interface';
import styles from './ReductionForm.module.css';
import CloseIcon from './close.svg';
import cn from 'classnames';
import { Input, Textarea, Button, Htag, P } from '../index';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import Select from 'react-select';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReductionForm = ({ CFACTORRISK, className, data, ...props }: ReductionFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReductionForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const [CACTIVITY, setCACTIVITY] = useState<number>();
	const router = useRouter();

	const onSubmit = async (formData: IReductionForm) => {
		if (typeof CACTIVITY !== 'undefined') {
			const data = await axios.post(API.reduction.post, { CFACTORRISK, CACTIVITY, ...formData });
			if (data.status == 201) {
				setIsSuccess(true);
				//reset();
				setTimeout(() => {
					router.push(`/factorrisk/${CFACTORRISK}`);
				}, 1000);
			} else {
				setError(data.statusText);
			}
		} else {
			setError("Не выбрано мероприятие");
		}
	};

	const options = data?.map(elem => {
		return {
			value: elem.ID,
			label: elem.Name
		}
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Select
					className={styles.description}
					classNamePrefix="select"
					isLoading={false}
					isClearable={true}
					isSearchable={true}
					name="CACTIVITY"
					placeholder='Мероприятия'
					options={options}
					onChange={(elem) => setCACTIVITY(elem?.value)}
				/>
				<Input type="number"
					{...register('NewPercent', { required: { value: true, message: 'Новая вероятность фактора' }, valueAsNumber: true })}
					placeholder='Новая вероятность фактора'
					error={errors.NewPercent}
					className={styles.description}
					aria-invalid={errors.NewPercent ? true : false}
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