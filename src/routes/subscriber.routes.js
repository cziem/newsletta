const express = require("express");
const router = express.Router();

const subscribersController = require("../controllers/subscribers");

router.get("/", subscribersController.getAllSubscribers);
router.get("/:id", subscribersController.getSubscriber);

// Sign-up a subscriber
router.post("/add", subscribersController.subscribeUser);

// Cancel subscription
router.delete("/cancel/:email", subscribersController.cancelSubscription);

module.exports = router;
