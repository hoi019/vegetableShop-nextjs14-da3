const ProductRoute = require('express').Router()
const ProductControllers = require('../controllers/product.controller')
const { uploadMd } = require('../middleware/upload')

ProductRoute.post('/', ProductControllers.createProduct)
ProductRoute.get('/:id', ProductControllers.getProductById)
ProductRoute.put('/:id', ProductControllers.updateProduct)
ProductRoute.delete('/:id', ProductControllers.deleteProduct)
ProductRoute.get('/', ProductControllers.getProductList)
ProductRoute.get('/:id/byCate', ProductControllers.getProducByCategory)

module.exports = ProductRoute