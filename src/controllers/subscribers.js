const { Subscribers } = require("../models/subscribers.schema");

// Get all subscribers
module.exports = {
  // Get a subscriber by ID
  getSubscriber: async (req, res) => {
    console.log(req, "req");

    res.send("working");
  },

  // Get all Subscribers
  getAllSubscribers: async (req, res) => {
    try {
      const result = await Subscribers.find();

      res.json({
        users: result,
        status: 200,
      });
    } catch (error) {
      res.status(500).send("an error occurred" + error.message);
    }
  },
};
