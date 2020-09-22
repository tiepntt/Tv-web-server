import { Create } from "../../CRUD/Student/Student";
import { AddStudentBySheet } from "../../service/google-api/addStudentBySheest";
import { HandelStatus } from "../HandelAction";

module.exports.CreateBySheets = async (req, res) => {
  if (!req.body.idSheet) {
    res.send(HandelStatus(204));
    return;
  }
  let arr = await AddStudentBySheet(req.body.idSheet);
  var data = (arr.result as any).data;
  await (data as any).forEach(async (item, index) => {
    if (index > 0) {
      var r = await Create({
        id: item[0],
        name: item[1],
        class: item[3],
        born: genBorn(item[2]),
      });
    }
  });
  res.send(HandelStatus(200));
};
const genBorn = (str) => {
  if (!str) {
    return "2000/01/01";
  }
  var strArr = str.split("/");
  return `${strArr[2]}/${strArr[1]}/${strArr[0]}`;
};
