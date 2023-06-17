import styles from './Input.module.css';
import { useState } from 'react';

type InputProps = {
	type: 'text' | 'number';
	inputName: string;
	inputId: string;
	inputLabel: string;
	placeholder: string;
	messageOnError: string;
	validationFn?: () => boolean;
};

export default function Input(props: InputProps) {
	const {
		type,
		placeholder,
		validationFn,
		inputName,
		inputId,
		inputLabel,
		messageOnError,
	} = props;
	const [isValid, setIsValid] = useState(false);
	const [isDirty, setIsDirty] = useState(false);

	const validateInput = () => {
		let validInput = true;
		if (validationFn && typeof validationFn === 'function') {
			validInput = validationFn();
		}
		setIsValid(validInput);
		setIsDirty(true);
	};

	return (
		<>
			<label htmlFor={inputName}>{inputLabel}</label>
			<input
				name={inputName}
				id={inputId}
				type={type}
				placeholder={placeholder}
				onBlur={validateInput}
			/>
			{!isValid && isDirty ? <p className={styles.error}>{messageOnError}</p> : null}
			{isValid ? (
				<div className='success'>
					<img src='success.svg' />
				</div>
			) : null}
		</>
	);
}
