import { getEmails, getID } from "../../libs/Sheet";
import { SendMail } from "../../service/gmail/email";
import { getData } from "../../service/google-api/api";
import { HandelStatus } from "../HandelAction";

module.exports.SendEmail = async (req, res) => {
  var text = req.body.text;
  var url = req.body.url;

  var Id = getID(url);
  if (!Id || !text) {
    res.send(HandelStatus(404));
    return;
  }
  var data = await getData(Id, "A1:Z10000");

  let emailsTo = await getEmails(data);

  var path = "public/" + res.locals.filePath;

  if (emailsTo.length == 0) {
    res.send(HandelStatus(404, "Không tìm thấy email"));
    return;
  }

  var attachments = [];

  if (path) {
    attachments.push({
      fileName: "tv.txt",
      contents: "hello world!",
      path: path,
    });
  }

  var config = {
    from: "thuvienhsv@gmail.com",
    to: emailsTo,
    text: text,
    attachments: attachments,
  };
  var result = await SendMail(config);
  res.send(result);
};
