const router = require('express').Router();
const controller = require('../controller/controller');

router.post('/products', controller.createProduct)
    .patch('/products', controller.updateProduct)
    .get('/products', controller.fetchAllProducts)
    .get('/getSingleProduct', controller.fetchProductById)
    .delete('/products',controller.deleteProductById);

router.post('/categories', controller.createCategory)
    .get('/categories', controller.fetchAllCategories);

router.post('/labels', controller.createLabel)
    .get('/labels', controller.fetchAllLabels)

router.post('/orders', controller.createOrder)
    .get('/orders', controller.fetchAllOrders)
    .delete('/orders', controller.deleteOrder)
    .patch('/orders', controller.updateOrder);

router.post('/trackorder',controller.trackOrder);

router.post('/auth', controller.verifyAdmin)

module.exports = router;