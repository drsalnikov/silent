import { FactorRiskFormProps } from './FactorRiskForm.props';
import { IFactorRiskForm } from './FactorRiskForm.interface';
import styles from './FactorRiskForm.module.css';
import CloseIcon from './close.svg';
import cn from 'classnames';
import { Input, Textarea, Button, Htag, P } from '../index';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import Select from 'react-select';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';


export const FactorRiskForm = ({ ID, CFACTOR, CRISK, Set, Percent, isNew, className, dataFactors, ...props }: FactorRiskFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IFactorRiskForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const [sCFACTOR, setCFACTOR] = useState<number>(Number(CFACTOR));

	const router = useRouter();

	const onSubmit = async (formData: IFactorRiskForm) => {
		const res = isNew
			? await axios.post(API.factorRisk.post, { CRISK, CFACTOR: sCFACTOR, ...formData })
			: await axios.put(API.factorRisk.put, { ID, CRISK, CFACTOR: sCFACTOR, ...formData });

		if (res.status == 201) {
			setIsSuccess(true);
			setTimeout(() => {
				router.push(`/risk/${CRISK}`);
			}, 1000);
		} else {
			setError(res.statusText);
		}
	};

	const options = dataFactors?.map(elem => {
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
					name="CFACTOR"
					placeholder='Факторы'
					options={options}
					defaultValue={options?.find(el => el.value == CFACTOR)}
					onChange={(elem) => {
						if (elem) {
							setCFACTOR(elem.value);
						}
					}}
				/>
				<Input type="number"
					{...register('Set', { required: { value: true, message: 'Группа факторов' }, valueAsNumber: true })}
					placeholder='Группа факторов'
					error={errors.Set}
					className={styles.description}
					defaultValue={Set}
					aria-invalid={errors.Set ? true : false}
				/>
				<Input type="number"
					{...register('Percent', { required: { value: true, message: 'Вероятность' }, valueAsNumber: true })}
					placeholder='Вероятность'
					error={errors.Percent}
					className={styles.description}
					defaultValue={Percent}
					aria-invalid={errors.Percent ? true : false}
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