const router = require('express').Router()
const boostController = require('../controllers/boostcolor')
const { multer, sendUploadToGCS } = require('../middlewares/multer')
const { Authentication } = require('../middlewares/auth')

router.use(Authentication)
router.get('/', boostController.find)
router.get('/:id', boostController.findById)
router.post('/', multer.single('photo'), sendUploadToGCS, boostController.create)
router.delete('/:id', boostController.delete)

module.exports = router