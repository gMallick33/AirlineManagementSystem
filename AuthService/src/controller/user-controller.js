const UserService = require("../services/user-service");
const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "successfully created a new user",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong in user controller layer",
      data: {},
      success: false,
      err: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      success: true,
      message: "successfully created a new user",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong in user controller layer",
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      message: "user is authenticated and token is valid",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong in user controller layer",
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      data: response,
      err: {},
      success: true,
      message: "successfully fetched whether the user is admin or not",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong in user controller layer",
      data: {},
      success: false,
      err: error,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const response = await userService.getUserById(req.params.id);
    return res.status(200).json({
      data: response,
      err: {},
      success: true,
      message: "successfully fetched whether the user is admin or not",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong in user controller layer",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
  getUserById,
};
