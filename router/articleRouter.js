const router = require('express').Router()
const ArticleController =  require('../controller/ArticleController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.get('/test', ArticleController.test)
router.post('/redactedArticle', ArticleController.removeDuplicate)
router.get('/masterFind', ArticleController.masterFind)
router.delete('/masterDelete', ArticleController.masterDelete)


router.use(authentication)
router.post('/', ArticleController.addArticle)

router.use('/:articleId', authorization)
router.delete('/:articleId', ArticleController.deleteArticle)

module.exports = router