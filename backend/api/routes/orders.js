const express = require('express')
const router = express.Router()

const orderControllers = require('../controllers/orders')

router.get('/', orderControllers.order_get_all)
router.post('/', orderControllers.order_create)
router.get('/:mail', orderControllers.order_get_mail)
router.get('/number/:orderNumber', orderControllers.order_get_orderNumber)
router.patch('/number/:orderNumber', orderControllers.order_modify_value)
// router.delete(
//   "/delete/:orderNumber",
//   orderControllers.order_delete_orderNumber
// );

module.exports = router
