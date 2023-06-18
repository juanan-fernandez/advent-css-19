import styles from './Input.module.css';
import { useState, useRef } from 'react';

type InputProps = {
	type: 'text' | 'number';
	inputName: string;
	inputId: string;
	inputLabel: string;
	placeholder: string;
	messageOnError: string;
	validationFn?: (inputVal: string | number | null) => boolean;
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
	const inputRef = useRef(null);

	const validateInput = () => {
		let validInput = true;
		if (validationFn && typeof validationFn === 'function') {
			console.log(inputRef.current.value);

			validInput =
				type === 'number'
					? validationFn(Number(inputRef.current.value))
					: validationFn(inputRef.current.value);
		}
		setIsValid(validInput);
		setIsDirty(true);
	};

	return (
		<div className={styles.input__control}>
			<label className={styles.input__label} htmlFor={inputName}>
				{inputLabel}
			</label>
			<input
				name={inputName}
				id={inputId}
				type={type}
				placeholder={placeholder}
				onBlur={validateInput}
				className={styles.input__input}
				ref={inputRef}
			/>
			{!isValid && isDirty ? <p className={styles.error}>{messageOnError}</p> : null}
			{isValid ? (
				<div className='success'>
					<img src='success.svg' />
				</div>
			) : null}
		</div>
	);
}
