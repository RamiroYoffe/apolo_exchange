const express = require('express')
const router = express.Router()
const currency = require('../models/currency')
const mongoose = require('mongoose')
const checkAdmin = require('../../middleware/checkAdm')

const currencyControllers = require('../controllers/currencies')

router.post('/', currencyControllers.currency_create)
router.get('/', currencyControllers.currency_get_all)
router.get('/:name', currencyControllers.currency_get_one)
router.get('/system/:system', currencyControllers.currency_get_system)
router.get('/code/:code', currencyControllers.currency_get_code)
router.get('/id/:id', currencyControllers.currency_get_id)
router.delete('/:name', currencyControllers.currency_delete_name)
router.patch('/:name', currencyControllers.currency_modify_value)
router.patch(
	'/system/:system',
	currencyControllers.currency_modify_value_system
)

module.exports = router
