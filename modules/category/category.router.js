const router = require('express').Router();
const categoryController = require('./category.controller');

router.get('/', categoryController.getAllCategory)
router.get('/:slug', categoryController.getCategory)
router.post('/', categoryController.createCategory)
router.put('/:slug', categoryController.updateCategory)

module.exports = router;