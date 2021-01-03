const cron = require("node-cron");
const moment = require("moment");
const { Subscribers } = require("../models/subscribers.schema");
const EmailSender = require("../lib/sendMail");

// Set locale to English by default
moment.locale("en");
const TODAY = moment().toDate();

// Schedule a newsletter task
cron.schedule("* * * * *", async () => {
  console.log("running a task every minute");
  const isTuesday = moment.weekdays(TODAY) === "Tuesday";
  console.log(isTuesday, "tuesday?");

  const subscribers = await Subscribers.find({}, { email: 1 });
  const subscribersList = subscribers.map((item) => item.email);

  const message = `
    Hello there,
    <br />
    <br />
    
    Top of the morning to you, today we'd love to introduce you to our new product; <b>MeevePad</b>.

    <h2>MeevePad</h2>
    <p>
      <b>MeevePad</b> is our new innovation auto pilot, created just for you. We heard you, and now we've built you your delight.
      <br />
      With this new feature, you'd be able to do all that you love and more all from the comfort of your room.
    </p>

    <h3>Come Check it out</h3>
    <p>We invite you to check it out today at <a href="#">meevapad.com</a></p>
  `;

  EmailSender.sendMail(subscribersList, message, "Meeva Letta Digest");
});

// Schedule a newsletter task
// The date signature means -> Run task every 8th - 14th day of the month, we'd then check to ensure that the day is 'Tuesday' before sending the newsletter.
cron.schedule("0 7 8-14 * *", async () => {
  const isTuesday = moment.weekdays(TODAY) === "Tuesday";

  // Send newsletter only on the 2nd Tuesday of the month.
  if (isTuesday) {
    const subscribers = await Subscribers.find({}, { email: 1 });
    const subscribersList = subscribers.map((item) => item.email);

    const message = `
      Hello there,
      <br />
      <br />
      
      Top of the morning to you, today we'd love to introduce you to our new product; <b>MeevePad</b>.

      <h2>MeevePad</h2>
      <p>
        <b>MeevePad</b> is our new innovation auto pilot, created just for you. We heard you, and now we've built you your delight.
        <br />
        With this new feature, you'd be able to do all that you love and more all from the comfort of your room.
      </p>

      <h3>Come Check it out</h3>
      <p>We invite you to check it out today at <a href="#">meevapad.com</a></p>
    `;

    EmailSender.sendMail(subscribersList, message, "Meeva Letta Digest");
  }
});
