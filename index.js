require("dotenv").config();
require("./src/jobs/tuesdayNewsletter");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { PORT, DB_URI, DB_URI_LOCAL } = process.env;
const DB = require("./src/config/database");
const superAdminDetails = require("./src/config/superAdmin.config");
const { isProd } = require("./src/lib/utils");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (!isProd) {
  app.use(logger("dev"));
}

const DB_URL = isProd ? DB_URI : DB_URI_LOCAL;
const subscriberRoutes = require("./src/routes/subscriber.routes");
const error = require("./src/middlewares/errors");

new DB(superAdminDetails).connect(DB_URL);

app.use("/api/subscribers", subscriberRoutes);
app.use(error);

app.listen(PORT, () =>
  console.log(`server running at http://localhost:${PORT}`)
);
