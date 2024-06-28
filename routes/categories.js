const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/", CategoryController.create);
router.get("/", CategoryController.getAll);
router.delete("/id/:id", CategoryController.delete);
router.put("/id/:id", CategoryController.update);
router.get("/id/:id", CategoryController.getById);
router.get("/name/:name", CategoryController.getOneByName);
router.get("/withProducts", CategoryController.getAllWithProduct);

module.exports = router;
