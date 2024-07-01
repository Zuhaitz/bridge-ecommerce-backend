const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.delete("/id/:id", ProductController.delete);
router.put("/id/:id", ProductController.update);
router.get("/id/:id", ProductController.getById);
router.get("/name/:name", ProductController.getByName);
router.get("/price/:price", ProductController.getByPrice);
router.get("/order", ProductController.getAllOrderByPrice);

module.exports = router;
