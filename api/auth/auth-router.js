const router = require('express').Router()


router.post('/something', async (req, res, next) => {
  res.json('something')
})

router.post('/something', async (req, res, next) => {
  res.json('something')
})

router.method('/something', async (req, res, next) => {
  res.json('something')
})

module.exports = router
