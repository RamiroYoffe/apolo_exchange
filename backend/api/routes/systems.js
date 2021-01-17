const express = require('express')
const router = express.Router()
const system = require('../models/system')
const mongoose = require('mongoose')
const checkAdmin = require('../../middleware/checkAdm')

const systemsControllers = require('../controllers/systems')

router.post('/', systemsControllers.system_create)
router.get('/', systemsControllers.system_get_all)
router.get('/:name', systemsControllers.system_get_one)
router.get('/currency/:currency', systemsControllers.system_get_currency)
router.get('/id/:id', systemsControllers.system_get_id)
router.delete('/:name', systemsControllers.system_delete_name)
router.patch('/:name', systemsControllers.system_modify_value)

module.exports = router
