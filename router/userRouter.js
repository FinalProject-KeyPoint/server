const router = require('express').Router()
const UserController = require('../controller/UserController')

router.get('/test', UserController.test)

module.exports = router