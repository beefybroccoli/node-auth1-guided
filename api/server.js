const path = require('path');
const express = require('express');
// const helmet = require('helmet'); // just for teachin'

// SESSION RELATED LIBS
const session = require('express-session') // the session
const Store = require('connect-session-knex')(session) // storing session in db

const usersRouter = require('./users/users-router.js');
const authRouter = require('./auth/auth-router.js'); // here

const server = express();

server.use(express.static(path.join(__dirname, '../client')));
// server.use(helmet()); // disable just for teachin'
server.use(express.json());
server.use(session({ // connecting the session middleware
  // SESSION CONFIG
  name: 'monkey',
  secret: process.env.SESSION_SECRET || 'keep it secret',
  cookie: {
    maxAge: 1000 * 60,
    secure: false, // ONLY over https
    httpOnly: true, // should javascript be unable to read this cookie?
  },
  resave: false, // needed for some session storage solutions
  saveUninitialized: false, // should server save a session by default?
  // DB STORAGE OF THE SESSIONS
  store: new Store({
    knex: require('../database/db-config'), // we need "db" (the connection)
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  })
}))

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter); // here

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
