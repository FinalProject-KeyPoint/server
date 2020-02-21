const router = require('express').Router()
const UserController = require('../controller/UserController')

router.get('/test', UserController.test)
router.get('/masterFind', UserController.masterFind)
router.delete('/masterDelete', UserController.masterDelete)

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router