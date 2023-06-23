type FnParameters = string | null;

export const validateName = (name: FnParameters): boolean => {
	if (!name) return false;
	return name.trim().length > 4;
};

export const validateEmail = (email: string): boolean => {
	return email.includes('@');
};

export const validatePasswordRules = (password: string): boolean => {
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
