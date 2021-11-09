const path = require('path');
const express = require('express');
const helmet = require('helmet');

//session related library
const session = require('express-session');
//session related library
const Store = require('connect-session-knex')(session)

const usersRouter = require('./users/users-router.js');
const authRouter = require('./auth/auth-router');

const server = express();

server.use(express.static(path.join(__dirname, '../client')));
server.use(helmet());
server.use(express.json());
//session related
server.use(session({
  //session config
  name:'monkey',
  secret: process.env.SESSION_SECRET || "secret key",
  cookie:{
    maxAge:1000*60*60, //last an hour
    secure: false, //set to true in production
    httpOnly:false, //set to true in production
  },
  resave: false,
  saveUninitialized: false,
  //DB Storage of the sessions
  store: new Store({
    //provide a database connection knex
    knex: require("../database/db-config"),
    tablename: 'sessions',
    sidfieldname:'sid',
    createtable:true,
    //flash the table every hour
    clearInterval :1000 * 60 * 60,
  })
}));

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

server.use('*', (req, res, next) => {
  next({ status: 404, message: 'not found!' });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
