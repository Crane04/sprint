const express = require("express");
const createUser = require("../controllers/user/create");
const signInUser = require("../controllers/user/signIn");
const registerCourse = require("../controllers/user/registerCourse");
const unRegisterCourse = require("../controllers/user/unregisterCourse");
const getUser = require("../controllers/user/get");
const getCourses = require("../controllers/user/getCourses");
const ValidateStudent = require("../middlewares/validateStudent");
const updateNotId = require("../controllers/user/updateNotId");
const router = express.Router();

router.post("/create", createUser);
router.post("/signin", signInUser);
router.post("/register-course", ValidateStudent, registerCourse);
router.post("/unregister-course", ValidateStudent, unRegisterCourse);
router.get("/get", ValidateStudent, getUser);
router.get("/courses", ValidateStudent, getCourses);
router.post("/update-not-id", ValidateStudent, updateNotId);

module.exports = router;
