const router = require('express').Router()
const SampleController = require('../controller/SampleController')

router.get('/test', SampleController.test)
router.get('/count', SampleController.count)
router.get('/masterFind', SampleController.masterFind)
router.delete('/masterDelete', SampleController.masterDelete)

module.exports = router