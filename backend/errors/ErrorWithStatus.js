export default class ErrorWithStatus extends Error {
  constructor(status, message) {
	super(message);
	this.message = message;
	this.status = status;
  }
}