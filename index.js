require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const slackEvents = require("./slackEvents");

const app = express();
app.use(bodyParser.json());

app.post("/slack/events", slackEvents);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
