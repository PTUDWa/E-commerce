var express = require('express')
var router = express.Router()
const profileController = require('./profileController')
const ordersController = require('./ordersController')

router.get('/', profileController.showProfile)
router.get('/orders', ordersController.showOrders)
router.get('/orders/pagination', ordersController.getOrdersPage)
router.get('/orders/details/:id', ordersController.showDetail)
router.get('/change-password', profileController.showChangePassword)
router.post('/check-out', ordersController.checkOut)
router.put('/change-password/:id', profileController.changePassword)
router.put('/:id', profileController.changeProfile)

module.exports = router
