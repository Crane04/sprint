const express = require("express");
const createUser = require("../controllers/user/create");
const signInUser = require("../controllers/user/signIn");
const registerCourse = require("../controllers/user/registerCourse");

const ValidateStudent = require("../middlewares/validateStudent");
const router = express.Router();

router.post("/create", createUser);
router.post("/signin", signInUser);
router.post("/register-course", ValidateStudent, registerCourse);

module.exports = router;
