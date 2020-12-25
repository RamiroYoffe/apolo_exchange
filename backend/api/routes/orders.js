const express = require("express");
const router = express.Router();

const orderControllers = require("../controllers/orders");

router.get("/", orderControllers.order_get_all);

module.exports = router;
