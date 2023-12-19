const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const { sendBasicEmail } = require("./services/email-service");

const TicketController = require("./controllers/ticket-controller");
const jobs = require("./utils/job");
const { REMINDER_BINDING_KEY } = require("./config/serverConfig");
const { subscribeMessage, createChannel } = require("./utils/messageQueue");
const EmailService = require("./services/email-service");
const setupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets", TicketController.create);
  const channel = await createChannel();
  subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);
  app.listen(PORT, async () => {
    console.log(`server started on: ${PORT}`);
    // sendBasicEmail(
    //   "support@admin.com",
    //   "gyani1@yopmail.com",
    //   "This is a testing email",
    //   "Hey, how are you, I hope you like our support"
    // );
    // jobs();
  });
};

setupAndStartServer();
