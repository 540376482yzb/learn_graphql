const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// import graphqlHTTP middleware and schema
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// load graphql into express
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080, () => {
  console.log('now listening for request on port 8080')
})

module.exports = app;
