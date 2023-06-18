import Input from '../Input/Input';

export default function Form() {
	const validateName = (name: string): boolean => {
		console.log(name);
		return name.trim().length > 4;
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
			</form>
		</section>
	);
}
