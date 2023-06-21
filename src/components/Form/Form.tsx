import styles from './Form.module.css';
import { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

export default function Form() {
	const [passwordValue, setPasswordValue] = useState('');
	const [passwordConfirmValue, setPasswordConfirmValue] = useState('');

	const updatePassword = (passValue: string): void => {
		setPasswordValue(passValue);
	};

	const updatePasswordConfirm = (passConfirmValue: string): void => {
		setPasswordConfirmValue(passConfirmValue);
	};

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
		console.log({ passwordValue, passwordConfirmValue });

		return validatePassword(password) && passwordValue === password;
	};

	const handleSubmitForm = (event: React.SyntheticEvent) => {
		event.preventDefault();
		console.log('submit');
	};

	return (
		<section>
			<form onSubmit={handleSubmitForm}>
				<Input
					placeholder='Name'
					inputId='name'
					inputLabel='Name'
					type='text'
					inputName='name'
					messageOnError='Please enter a valid name'
					validationFn={validateName}
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
					inputName='email'
					messageOnError='Password length must be 6 characters at least and only include letters and numbers'
					validationFn={validatePassword}
					onPasswordInput={updatePassword}
				/>
				<Input
					placeholder='Password confirm'
					inputId='password-confirm'
					type='password'
					inputLabel='Confirm password'
					inputName='password-confirm'
					messageOnError='Password confirmation is not equal to password'
					validationFn={validatePasswordConfirmation}
					onPasswordInput={updatePasswordConfirm}
				/>
				<Button>Submit</Button>
			</form>
		</section>
	);
}
