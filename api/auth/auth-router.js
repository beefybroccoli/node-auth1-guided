const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const newUser = { username, password }
    const result = await User.add(newUser)
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  res.json('login wired!!')
})

router.get('/logout', async (req, res, next) => {
  res.json('logout wired!!!')
})

module.exports = router
