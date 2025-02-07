const express = require("express");
const createCourse = require("../controllers/courses/add");
const getCourses = require("../controllers/courses/get");
const ValidateHOC = require("../middlewares/validateHOC");

const router = express.Router();

router.post("/create", createCourse);
router.get("/get", ValidateHOC, getCourses);

module.exports = router;
