import express from 'express'
import indexRouter from './routes/IndexRouter'
import usersRouter from './routes/IndexRouter'

const app = express()
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

// TODO: Pourquoi pas utiliser morgan comme logger ?
// TODO: cookie aussi à regarder !

app.use(express.json()); // TODO : A ENLEVER SUREMENT PEUT ETRE PK PAS
app.use(express.urlencoded({ extended: false })); // TODO : A ENLEVER SUREMENT PEUT ETRE PK PAS

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app
// error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });