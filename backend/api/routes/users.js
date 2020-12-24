const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/users");

router.get("/", userControllers.user_get_all);
router.post("/", userControllers.user_crear);
router.post("/login", userControllers.user_login);
module.exports = router;
