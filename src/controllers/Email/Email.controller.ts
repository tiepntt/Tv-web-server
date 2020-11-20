import { getEmails, getID } from "../../libs/Sheet";
import { SendMail } from "../../service/gmail/email";
import { getData } from "../../service/google-api/api";
import { HandelStatus } from "../HandelAction";

module.exports.SendEmail = async (req, res) => {
  let text = req.body.text;
  let url = req.body.url;

  let Id = getID(url);
  if (!Id || !text) {
    res.send(HandelStatus(404));
    return;
  }
  let data = await getData(Id, "A1:Z10000");

  let emailsTo = await getEmails(data);

  let path = "public/" + res.locals.filePath;

  if (emailsTo.length == 0) {
    res.send(HandelStatus(404, "Không tìm thấy email"));
    return;
  }

  let attachments = [];

  if (path) {
    attachments.push({
      fileName: "tv.txt",
      contents: "hello world!",
      path: path,
    });
  }

  let config = {
    from: "thuvienhsv@gmail.com",
    to: emailsTo,
    text: text,
    attachments: attachments,
  };
  // let result = await SendMail(config);
  res.send(500);
};
