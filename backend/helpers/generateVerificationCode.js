export function generateVerificationCode(length = 6) {
	const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
	let verificationCode = '';
	for (let i = 0; i < length; i++) {
		verificationCode += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return verificationCode;
}