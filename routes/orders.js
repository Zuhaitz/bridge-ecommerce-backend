const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");
const { authentication } = require("../middleware/authentication");

// TODO: Maybe add is Admin condition
router.get("/", authentication, OrderController.getAll);
router.post("/", authentication, OrderController.create);

module.exports = router;
