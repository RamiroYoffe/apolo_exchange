const express = require('express')
const router = express.Router()
const transaction = require('../models/transaction')
const mongoose = require('mongoose')
const checkAdmin = require('../../middleware/checkAdm')

const transactionsControllers = require('../controllers/transactions')

router.post('/', transactionsControllers.transaction_create)
router.get('/', transactionsControllers.transaction_get_all)
router.get('/:name', transactionsControllers.transaction_get_one)
router.get('/id/:id', transactionsControllers.transaction_get_id)
router.delete('/:name', transactionsControllers.transaction_delete_name)
router.patch('/:name', transactionsControllers.transaction_modify_value)

module.exports = router
