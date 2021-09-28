import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { IProc, IProcesses, IRisk, IProcEdit } from '../../interfaces/processes.interface';
import DataTable, { TableProps, TableRow } from 'react-data-table-component';
import { Htag, Card, P, Divider, Input, Button } from '../../components';
import CloseIcon from './close.svg';
import cn from 'classnames';
import axios from 'axios';
import { API } from '../../helpers/api';
import styles from './ItprocEditComponent.module.css';
import { ItprocEditFormProps } from './ItprocEditComponent.props';
import { IprocEditForm, ItprocEditSentResponse } from './ItprocEditComponent.interface';

export const ItprocEditForm = ({ ID, Name, RTO, Level, className, ...props }: ItprocEditFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IprocEditForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const router = useRouter();

	const onSubmit = async (formData: IprocEditForm) => {

		const res = await axios.put<ItprocEditSentResponse>(API.itproc.put, { ID, ...formData });
		if (res.status == 201) {
			setIsSuccess(true);
			//reset();
			setTimeout(() => {
				router.push(`/itprocesses`);
			}, 1000);
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
					{...register('Name', { required: { value: true, message: 'Наименование' } })}
					placeholder='Наименование'
					error={errors.Name}
					className={styles.description}
					defaultValue={Name}
					aria-invalid={errors.Name ? true : false}
				/>
				<Input type='number'
					{...register('RTO', { required: { value: true, message: 'РТО' }, valueAsNumber: true })}
					placeholder='RTO'
					error={errors.RTO}
					className={styles.description}
					defaultValue={RTO}
					aria-invalid={errors.RTO ? true : false}
				/>
				<Input
					{...register('Level', { required: { value: true, message: 'Уровень критичности' } })}
					placeholder='Уровень критичности'
					className={styles.description}
					error={errors.Level}
					defaultValue={Level}
					aria-invalid={errors.Level ? true : false}
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