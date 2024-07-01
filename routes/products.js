const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authentication } = require("../middleware/authentication");

router.post("/", authentication, ProductController.create);
router.get("/", ProductController.getAll);
router.delete("/id/:id", authentication, ProductController.delete);
router.put("/id/:id", authentication, ProductController.update);
router.get("/id/:id", ProductController.getById);
router.get("/name/:name", ProductController.getByName);
router.get("/price/:price", ProductController.getByPrice);
router.get("/order", ProductController.getAllOrderByPrice);

module.exports = router;
