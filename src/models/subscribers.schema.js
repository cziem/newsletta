const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const subscribersSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const validateSubscriber = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(user);
};

const Subscribers = mongoose.model("Subscribers", subscribersSchema);

module.exports = {
  Subscribers,
  validateSubscriber,
};
