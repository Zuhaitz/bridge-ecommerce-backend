const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/", CategoryController.create);
router.get("/", CategoryController.getAll);
router.delete("/:id", CategoryController.delete);
router.put("/:id", CategoryController.update);
router.get("/:id", CategoryController.getById);
router.get("/name/:name", CategoryController.getOneByName);

module.exports = router;
