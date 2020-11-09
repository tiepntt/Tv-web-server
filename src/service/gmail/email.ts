import { type } from "os";
import { config } from "process";
import { HandelStatus } from "../../controllers/HandelAction";

let nodemailer = require("nodemailer");

export type MailConfig = {
  from?: string;
  to?: any;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: any;
};
export const SendMail = async (config: MailConfig) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "thuvienhsv.uet@gmail.com",
      pass: "thuvien.uet",
    },
  });
  await transporter.sendMail({
    from: config.from || "thuvienhsv@gmail.com",
    to: config.to,
    subject: config.subject || "Thông báo",
    text: config.text || "test",
    html: config.html || null,
    attachments: config.attachments || null,
  });
  return HandelStatus(200);
};
