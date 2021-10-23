const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const { SignInCheckMiddleware } = require("../middlewares/auth");

router.post("/", SignInCheckMiddleware, orderController.userOrders);
router.post("/createOrder", SignInCheckMiddleware, orderController.createOrder);

module.exports = router;
