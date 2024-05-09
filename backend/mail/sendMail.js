import {config} from './configMail.js';
import nodemailer from "nodemailer";

export const sendMail = async (to, subject, html) => {
	const transporter = nodemailer.createTransport(config);

	const mailOptions = {
		from: process.env.GMAIL_USER,
		to,
		subject,
		html
	};

	console.log(config);
	return transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);
	});
}