const express = require("express");
const router = express.Router();

const orderControllers = require("../controllers/orders");

router.get("/", orderControllers.order_get_all);
router.post("/", orderControllers.order_crear);
router.get("/:mail", orderControllers.order_get_mail);
router.get("/#/:numeroOrden", orderControllers.order_get_numeroOrden);
router.delete("/delete/:numeroOrden", orderControllers.order_delete_nombre);

module.exports = router;
