const express = require("express");
const router = express.Router();
const Moneda = require("../models/moneda");
const mongoose = require("mongoose");

const monedaControllers = require("../controllers/monedas");

router.post("/agregar", monedaControllers.moneda_crear);
router.get("/all", monedaControllers.moneda_get_all);
router.get("/:nombre", monedaControllers.moneda_get_one);
router.delete("/:nombre", monedaControllers.moneda_delete_nombre);

module.exports = router;
