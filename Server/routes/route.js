const express = require("express");
const router = express.Router();
const usercontroller = require("../Controllers/usercontroller");

router.post("/signup", usercontroller.signup);
router.post("/login", usercontroller.login);
//  router.post("/refreshToken", usercontroller.refreshToken);

module.exports = router;
