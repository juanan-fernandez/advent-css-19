import { useState } from 'react';
import Input from '../Input/Input';

export default function Form() {
	const [passwordValue, setPasswordValue] = useState('');
	const [passwordConfirmValue, setPasswordConfirmValue] = useState('');

	const validateName = (name: string): boolean => {
		console.log(name);
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
		return validatePassword(password) && passwordValue === passwordConfirmValue;
	};

	return (
		<section>
			<form>
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
				/>
				<Input
					placeholder='Password confirm'
					inputId='password-confirm'
					type='password'
					inputLabel='Confirm password'
					inputName='password-confirm'
					messageOnError='Password confirmation is not equal to password'
					validationFn={validatePasswordConfirmation}
				/>
			</form>
		</section>
	);
}
