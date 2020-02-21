const router = require('express').Router()

router.use('/users', require('./userRouter'))
router.use('/articles', require('./articleRouter'))

module.exports = router