const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const db = require('./config/db')
const passport = require('./passport')

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const blogRouter = require('./routes/blog/blog');
const cartRouter = require('./routes/cart/cart');
const productRouter = require('./component/products/index');
//const signInRouter = require('./routes/authentication/signin');
//const signUpRouter = require('./routes/authentication/signup');
const authRouter = require('./component/authentication')
// const usersRouter = require('./routes/users');

// connect to DB
db.connect()

const app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'),path.join(__dirname, 'component')]);
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/products', productRouter);
// app.use('/products/:id', productDetailRouter);
app.use('/blog', blogRouter);
app.use('/cart', cartRouter);
//app.use('/signin', signInRouter)

//app.use('/signup', signUpRouter)
// app.use('/productDetail', productDetailRouter)

// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
