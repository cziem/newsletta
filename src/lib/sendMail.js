const nodeMailer = require("nodemailer");
const { isProd } = require("../lib/utils");

const EmailSender = {
  sendMail: async function (emails, message, subject, fromWho) {
    isProd
      ? await this.mailer(emails, message, subject, fromWho)
      : await this.mailerTester(emails, message, subject, fromWho);
  },

  mailer: async function (emails, message, subject, fromWho) {
    let transporter = nodeMailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "",
        pass: "",
      },
      tls: { rejectUnauthorized: false },
    });

    // send mail with defined transport object
    let mailData = await transporter.sendMail({
      from: fromWho ? fromWho : '"Letta" <desk@newsletta.com>',
      to: emails,
      subject: subject,
      html: message,
    });
    console.info(mailData);

    return "Done";
  },

  mailerTester: async function (emails, message, subject, fromWho) {
    let testAccount = await nodeMailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodeMailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // send mail with defined transport object
    let mailData = await transporter.sendMail({
      from: fromWho ? fromWho : '"Letta" <desk@newsletta.com>',
      to: emails,
      subject: subject,
      html: message,
    });

    console.info("Preview URL: %s", nodeMailer.getTestMessageUrl(mailData));

    return "done";
  },
};

module.exports = EmailSender;
