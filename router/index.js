const router = require('express').Router()

router.use('/users', require('./userRouter'))
router.use('/articles', require('./articleRouter'))
router.use('/samples', require('./sampleRouter'))

module.exports = router