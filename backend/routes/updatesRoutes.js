const express = require("express");
const createUpdate = require("../controllers/update/create");
const getAllUpdates = require("../controllers/update/getAll");
const getOneUpdate = require("../controllers/update/getOne");
const ValidateHOC = require("../middlewares/validateHOC");
const ValidateStudent = require("../middlewares/validateStudent");

const router = express.Router();

router.post("/create", ValidateHOC, createUpdate);
router.get("/all", ValidateStudent, getAllUpdates);
router.get("/updates/:id", getOneUpdate);

module.exports = router;
