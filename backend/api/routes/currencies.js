const express = require("express");
const router = express.Router();
const currency = require("../models/currency");
const mongoose = require("mongoose");
const checkAdmin = require("../../middleware/checkAdm");

const currencyControllers = require("../controllers/currencies");

router.post("/", currencyControllers.currency_create);
router.get("/", currencyControllers.currency_get_all);
router.get("/:name", currencyControllers.currency_get_one);
router.get("/system/:system", currencyControllers.currency_get_system);
router.delete("/:name", currencyControllers.currency_delete_name);
router.patch("/:name", currencyControllers.currency_modify_value);

module.exports = router;
