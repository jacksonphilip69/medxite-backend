const { register, login } = require("../backend/authcontroller");      //register and login fn
const { checkUser } = require("../backend/authmiddleware");

const router = require("express").Router();               
                                                                        //login & register route
router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);


module.exports = router;
