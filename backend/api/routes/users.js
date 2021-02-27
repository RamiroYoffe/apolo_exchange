const express = require("express");
const router = express.Router();
const checkAuth = require("../../middleware/checkAuth");
const userControllers = require("../controllers/users");

router.get("/", userControllers.user_get_all);
router.post("/register", userControllers.user_register);
router.post("/login", userControllers.user_login);
router.get("/alive", checkAuth, userControllers.user_Islogin);
router.get("/mail", checkAuth, userControllers.user_get_mail);
module.exports = router;
