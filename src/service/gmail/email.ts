import { type } from "os";
import { config } from "process";
import { HandelStatus } from "../../controllers/HandelAction";

let nodemailer = require("nodemailer");

export class MailConfig {
  from?: string;
  to?: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: any;
}
const transporter = nodemailer.createTransport({
  tls: {
    rejectUnauthorized: false,
  },
  pool: true,
  host: process.env.HOSTNAME,
  port: process.env.PORT || 587,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
console.log(
  process.env.HOSTNAME,
  process.env.EMAIL_NAME,
  process.env.EMAIL_PASSWORD
);

export const SendMail = async (config: MailConfig) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_NAME,
      to: config.to,
      subject: config.subject || "Thông báo",
      text: config.text || "test",
      html: config.html || null,
      attachments: config.attachments || null,
    });
    return HandelStatus(200);
  } catch (e) {
    console.log(e);

    return HandelStatus(500, e);
  }
};
