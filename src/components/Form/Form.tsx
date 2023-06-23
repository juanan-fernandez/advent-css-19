import { useState, useRef, useEffect } from 'react';
import {
	validateEmail,
	validateName,
	validatePasswordRules,
} from '../../services/validation';
import Input from '../Input/Input';
import Button from '../Button/Button';

type ValidInputTypes = string | number | null;

export default function Form() {
	const [isValidForm, setIsValidForm] = useState(false);
	const [isValidName, setIsValidName] = useState(false);
	const [isValidMail, setIsValidMail] = useState(false);
	const [isValidPassword, setIsValidPassword] = useState(false);
	const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(false);
	const passwordRef = useRef<ValidInputTypes>(null);
	const passwordConfirmRef = useRef<ValidInputTypes>(null);

	const updateFormValidation = (isValidInput: boolean, inputName: string): void => {
		console.log({ isValidInput, inputName });
		if (inputName === 'name') setIsValidName(isValidInput);
		if (inputName === 'email') setIsValidMail(isValidInput);
		if (inputName === 'password') setIsValidPassword(isValidInput);
		if (inputName === 'password_confirm') setIsValidPasswordConfirm(isValidInput);
	};

	const updatePassword = (passValue: string): void => {
		if (passValue) passwordRef.current = passValue;
	};

	const updatePasswordConfirm = (passConfirmValue: string): void => {
		if (passConfirmValue) passwordConfirmRef.current = passConfirmValue;
	};

	useEffect(() => {
		const valid =
			isValidName && isValidMail && isValidPassword && isValidPasswordConfirm;

		setIsValidForm(valid);
	}, [isValidName, isValidMail, isValidPassword, isValidPasswordConfirm]);

	const validatePassword = (password: string): boolean => {
		let result = validatePasswordRules(password);
		if (passwordConfirmRef.current)
			result = result && password === passwordConfirmRef.current;
		return result;
	};

	const validatePasswordConfirmation = (password: string): boolean => {
		return validatePasswordRules(password) && passwordRef.current === password;
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
					updateValueFn={updateFormValidation}
				/>
				<Input
					placeholder='E-mail'
					inputId='email'
					type='text'
					inputLabel='E-mail'
					inputName='email'
					messageOnError='Please enter a valid e-mail'
					validationFn={validateEmail}
					updateValueFn={updateFormValidation}
				/>
				<Input
					placeholder='Password'
					inputId='password'
					type='password'
					inputLabel='Password'
					inputName='password'
					messageOnError='Password length must be 6 characters at least and only include letters and numbers.'
					validationFn={validatePassword}
					updateValueFn={updateFormValidation}
					passwordInputUpdate={updatePassword}
				/>
				<Input
					placeholder='Password confirm'
					inputId='password_confirm'
					type='password'
					inputLabel='Confirm password'
					inputName='password_confirm'
					messageOnError='Password confirmation is not equal to password'
					validationFn={validatePasswordConfirmation}
					updateValueFn={updateFormValidation}
					passwordInputUpdate={updatePasswordConfirm}
				/>
				<Button disabled={!isValidForm}>Submit</Button>
			</form>
		</section>
	);
}
