/**
 * Application middleware
 * http://expressjs.com/guide/using-middleware.html#middleware.application
 */

var express = require('express');
var app = express();
// app.locals will be avaliable for all
app.locals.myIp = '123.234.23';

/*
 * next lets you go on to the next app.use
 * Order does matter
 * res.locals will always be there ( apart of express )
 */

app.use(function handler1(req, res, next) {
  console.log('res.locals', res.locals);
  // res.locals only avaliable for this app.use
  res.locals.myName = 'Kasi';
  next();
});

app.use(function handler2(req, res, next) {
  console.log('res.locals', res.locals);
  //deletes myName, will not show anything for handler 3
  if (res.locals.myName === 'Kasi') {
    res.json({ name : res.locals.myName });
  } else {
    delete res.locals.myName;
    next();
  }
});

app.use(function handler3(req, res, next) {
  console.log('res.locals', res.locals);
  next();
});

app.listen(3000);