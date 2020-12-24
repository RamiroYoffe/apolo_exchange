const express = require("express");
const router = express.Router();
const Moneda = require("../models/moneda");
const mongoose = require("mongoose");

const monedaControllers = require("../controllers/monedas");

router.post("/", monedaControllers.moneda_crear);
router.get("/", monedaControllers.moneda_get_all);
router.get("/:nombre", monedaControllers.moneda_get_one);
router.delete("/:nombre", monedaControllers.moneda_delete_nombre);
router.patch("/:nombre", monedaControllers.moneda_modificar_valor);

module.exports = router;
