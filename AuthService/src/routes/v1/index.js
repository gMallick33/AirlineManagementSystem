const express = require("express");
const UserController = require("../../controller/user-controller");
const { AuthRequestValidator } = require("../../middlewares/index");
const router = express.Router();

router.post(
  "/signup",
  AuthRequestValidator.validateUserAuth,
  UserController.create
);
router.post(
  "/signin",
  AuthRequestValidator.validateUserAuth,
  UserController.signIn
);

router.get("/isAuthenticated", UserController.isAuthenticated);

router.get(
  "/isAdmin",
  AuthRequestValidator.validateIsAdminRequest,
  UserController.isAdmin
);

router.get("/users/:id", UserController.getUserById);
module.exports = router;
