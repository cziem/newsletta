const {
  Subscribers,
  validateSubscriber,
} = require("../models/subscribers.schema");
const EmailSender = require("../lib/sendMail");

// Get all subscribers
module.exports = {
  // Get a subscriber by ID
  getSubscriber: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Subscribers.findOne(
        { _id: id },
        { email: 1, createdAt: 1 }
      );

      if (!result) {
        res.status(404).json({
          message: "No record found",
        });
      }

      res.status(200).json({
        user: result,
      });
    } catch (error) {
      res.status(500).send(`Oppsss, an error occurred: ${error.message}`);
    }
  },

  // Get all Subscribers
  getAllSubscribers: async (req, res) => {
    try {
      const result = await Subscribers.find({}, { email: 1, createdAt: 1 });

      res.status(200).json({
        users: result,
      });
    } catch (error) {
      res.status(500).send(`Oppsss, an error occurred: ${error.message}`);
    }
  },

  // Subscribe a user to newsletter
  subscribeUser: async (req, res) => {
    try {
      const { error } = validateSubscriber(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const { email } = req.body;
      const foundUser = await Subscribers.findOne({ email });

      if (foundUser) {
        return res.status(400).json({
          message: "You have already subscribed",
        });
      }

      await Subscribers.create({ email });

      res.status(200).json({
        message:
          "You have successfully subscribed. We have a surprise for you in your inbox",
      });

      const message = `
        Welcome to <b>Meeva Letta</b>, we are thrilled you have joined us.
        <br />
        A couple of things we'd like you to do:

        <ol>
          <li>Get your seat belt on</li>
          <li>Grab a cup of coffee</li>
          <li>Get ready for Meeva Fun</li>
        </ol>

        See you in our monthly digest, every 2nd Tuesday, I'd be here to give you a ride.
      `;

      EmailSender.sendMail(email, message, "Welcome onboard, Meev");
    } catch (error) {
      res.status(500).send(`Oppsss, an error occurred: ${error.message}`);
    }
  },

  // Cancel subscription
  cancelSubscription: async (req, res) => {
    try {
      const { error } = validateSubscriber(req.params);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const { email } = req.params;
      const deletedUser = await Subscribers.findOneAndDelete({ email });

      if (!deletedUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "Your subscription is now cancelled",
      });
    } catch (error) {
      res.status(500).send(`Oppsss, an error occurred: ${error.message}`);
    }
  },
};
