const express = require("express");
const createUpdate = require("../controllers/update/create");
const getAllUpdates = require("../controllers/update/getAll");
const getOneUpdate = require("../controllers/update/getOne");
const updateUpdate = require("../controllers/update/update");
const deleteClassUpdate = require("../controllers/update/delete");
const ValidateHOC = require("../middlewares/validateHOC");
const ValidateStudent = require("../middlewares/validateStudent");

const router = express.Router();

router.post("/create", ValidateHOC, createUpdate);
router.get("/all", ValidateStudent, getAllUpdates);
router.get("/:id", getOneUpdate);
router.post("/update/:id", ValidateHOC, updateUpdate);
router.post("/delete/:id", ValidateHOC, deleteClassUpdate);

module.exports = router;
