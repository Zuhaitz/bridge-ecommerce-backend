const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.delete("/:id", ProductController.delete);
router.put("/:id", ProductController.update);
router.get("/:id", ProductController.getById);
router.get("/name/:name", ProductController.getOneByName);

module.exports = router;
