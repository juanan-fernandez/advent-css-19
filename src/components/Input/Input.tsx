import styles from './Input.module.css';
import { useState, useRef } from 'react';

type InputProps = {
	type: 'text' | 'number' | 'password';
	inputName: string;
	inputId: string;
	inputLabel: string;
	placeholder: string;
	messageOnError: string;
	validationFn?(inputVal: string | number | null | undefined): boolean;
	onPasswordInput?(inputVal: string): void;
};

//inputVal:

export default function Input(props: InputProps) {
	const {
		type,
		placeholder,
		validationFn,
		onPasswordInput,
		inputName,
		inputId,
		inputLabel,
		messageOnError,
	} = props;

	const [isValid, setIsValid] = useState(false);
	const [isDirty, setIsDirty] = useState(false);
	const [lostFocus, setLostFocus] = useState(false);
	const [hideShow, setHideShow] = useState('show.svg');
	const [inputType, setInputType] = useState(type);
	const inputRef = useRef<HTMLInputElement>(null);

	const onHideShowAction = () => {
		setHideShow(prev => {
			return prev === 'show.svg' ? 'hide.svg' : 'show.svg';
		});
		setInputType(prev => {
			return prev === 'text' ? 'password' : 'text';
		});
	};

	const validateInput = () => {
		let validInput = true;

		if (onPasswordInput && typeof onPasswordInput === 'function' && inputRef.current) {
			onPasswordInput(inputRef.current?.value);
		}

		if (validationFn && typeof validationFn === 'function') {
			validInput =
				type === 'number'
					? validationFn(Number(inputRef.current?.value))
					: validationFn(inputRef.current?.value);
		}
		setLostFocus(true);
		setIsValid(validInput);
	};

	const handleChange = () => {
		setIsDirty(true);
	};

	const handleFocus = () => {
		setLostFocus(false);
	};

	return (
		<div className={styles.input__row_container}>
			<div className={styles.input__control}>
				<label className={styles.input__label} htmlFor={inputName}>
					{inputLabel}
				</label>
				{type === 'password' ? (
					<img
						src={`/${hideShow}`}
						className={styles['input__control--icon']}
						onClick={onHideShowAction}
					/>
				) : null}
				<input
					name={inputName}
					id={inputId}
					type={inputType}
					placeholder={placeholder}
					onBlur={validateInput}
					onChange={handleChange}
					onFocus={handleFocus}
					className={styles.input__input}
					ref={inputRef}
				/>
			</div>
			<div className={styles.success_error}>
				{!isValid && isDirty && lostFocus ? (
					<p className={`${styles.icon} ${styles.error}`}>{messageOnError}</p>
				) : null}
				{isValid ? (
					<div className={styles.icon}>
						<img src='success.svg' />
					</div>
				) : null}
			</div>
		</div>
	);
}
