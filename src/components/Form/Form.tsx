import { useState, useRef } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

type ValidInputTypes = string | number | null;

export default function Form() {
	// const [name, setName] = useState<ValidInputTypes>('');
	// const [mail, setMail] = useState<ValidInputTypes>('');
	// const [passwordValue, setPasswordValue] = useState<ValidInputTypes>('');
	// const [passwordConfirmValue, setPasswordConfirmValue] = useState<ValidInputTypes>('');

	const nameRef = useRef<ValidInputTypes>(null);
	const mailRef = useRef<ValidInputTypes>(null);
	const passwordRef = useRef<ValidInputTypes>(null);
	const passwordConfirmRef = useRef<ValidInputTypes>(null);

	const updateValue = (inputValue: ValidInputTypes, inputName: string): void => {
		// if (inputName === 'name') setName(inputValue);
		// if (inputName === 'mail') setMail(inputValue);
		// if (inputName === 'password') setPasswordValue(inputValue);
		// if (inputName === 'passwordConfirm') setPasswordConfirmValue(inputValue)

		if (inputName === 'name') nameRef.current = inputValue;
		if (inputName === 'mail') mailRef.current = inputValue;
		if (inputName === 'password') passwordRef.current = inputValue;
		if (inputName === 'passwordConfirm') passwordConfirmRef.current = inputValue;
	};

	// const updatePassword = (passValue: string): void => {
	// 	setPasswordValue(passValue);
	// };

	// const updatePasswordConfirm = (passConfirmValue: string): void => {
	// 	setPasswordConfirmValue(passConfirmValue);
	// };

	const validateName = (name: string): boolean => {
		return name.trim().length > 4;
	};

	const validateEmail = (email: string): boolean => {
		return email.includes('@');
	};

	const validatePassword = (password: string): boolean => {
		const letters = 'abcdefghijklmnñopqrstuvwxyz';
		const numbers = '1234567890';
		const passwordAux = password.toLowerCase().split('');
		let isValidChars = false;
		let isValidNums = false;

		passwordAux.forEach(item => {
			if (letters.indexOf(item) >= 0) isValidChars = true;
		});

		passwordAux.forEach(item => {
			if (numbers.indexOf(item) >= 0) isValidNums = true;
		});

		return password.length >= 6 && isValidChars && isValidNums;
	};

	const validatePasswordConfirmation = (password: string): boolean => {
		console.log({ passwordRef, passwordConfirmRef });

		return validatePassword(password) && passwordRef.current === password;
	};

	const handleSubmitForm = (event: React.SyntheticEvent) => {
		event.preventDefault();
		console.log('submit');
	};

	return (
		<section>
			<form onSubmit={handleSubmitForm} autoComplete='off'>
				<Input
					placeholder='Name'
					inputId='name'
					inputLabel='Name'
					type='text'
					inputName='name'
					messageOnError='Please enter a valid name'
					validationFn={validateName}
					updateValueFn={updateValue}
				/>
				<Input
					placeholder='E-mail'
					inputId='email'
					type='text'
					inputLabel='E-mail'
					inputName='email'
					messageOnError='Please enter a valid e-mail'
					validationFn={validateEmail}
				/>
				<Input
					placeholder='Password'
					inputId='password'
					type='password'
					inputLabel='Password'
					inputName='password'
					messageOnError='Password length must be 6 characters at least and only include letters and numbers'
					validationFn={validatePassword}
					updateValueFn={updateValue}
				/>
				<Input
					placeholder='Password confirm'
					inputId='password_confirm'
					type='password'
					inputLabel='Confirm password'
					inputName='password_confirm'
					messageOnError='Password confirmation is not equal to password'
					validationFn={validatePasswordConfirmation}
					updateValueFn={updateValue}
				/>
				<Button>Submit</Button>
			</form>
		</section>
	);
}
