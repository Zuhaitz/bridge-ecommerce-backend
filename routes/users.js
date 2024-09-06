const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const { authentication } = require("../middleware/authentication");
const upload = require("../config/cloudinary");

router.get("/", authentication, UserController.getInfo);
router.post("/", UserController.create);
router.post(
  "/profile",
  authentication,
  upload.single("picture"),
  UserController.uploadImage,
);
router.post("/login", UserController.login);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
