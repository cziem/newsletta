const express = require("express");
const router = express.Router();

const subscribersController = require("../controllers/subscribers");

router.get("/", subscribersController.getAllSubscribers);
router.get("/:id", subscribersController.getSubscriber);

module.exports = router;
