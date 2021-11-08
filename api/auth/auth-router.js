const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 6) // 2 ^ 6
    const newUser = { username, password: hash }
    const user = await User.add(newUser)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    // pull u/p from req.body
    // verify that username exists
    // verify that password is legit
    // START SESSION (magic line)
  } catch (err) {
    next(err)
  }
})

router.get('/logout', async (req, res, next) => {
  res.json('logout wired!!!')
})

module.exports = router
