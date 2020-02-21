const router = require('express').Router()
const ArticleController =  require('../controller/ArticleController')

router.get('/test', ArticleController.test)
router.get('/redactedArticle', ArticleController.removeDuplicate)

module.exports = router