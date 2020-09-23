import { getRepository } from "typeorm";
import { Create, GetAll, Update } from "../../CRUD/Student/Student";
import { Student } from "../../entity/Student/Student";
import { genBorn } from "../../libs/Book";
import { mapToArr } from "../../libs/Map";
import { AddBySheet } from "../../service/google-api/addStudentBySheest";
import { pushData } from "../../service/google-api/api";
import { IdData } from "../../service/Id/id";
import { HandelStatus } from "../HandelAction";


module.exports.CreateBySheets = async (req, res) => {
  let StudentRepo = getRepository(Student)
  if (!req.body.k) {
    res.send(HandelStatus(204));
    return;
  }
  let Id = IdData[req.body.k];
  if (!Id) {
    res.send(HandelStatus(404))
    return;
  }
  let arr = await AddBySheet(Id);
  var data = (arr.result as any).data;
  await (data as any).forEach(async (item, index) => {
    if (index > 0) {
      let studentGet = await StudentRepo.findOne({ idStudent: item[0] });
      let studentConfig = {
        id: item[0],
        name: item[1],
        class: item[3],
        born: genBorn(item[2]),
      }
      if (studentGet) {
        await Update(studentConfig);
      }
      else { await Create(studentConfig); }
    }
  });
  res.send(HandelStatus(200));
};
module.exports.PushToSheets = async (req, res) => {
  let StudentRepo = getRepository(Student)
  if (!req.body.k) {
    res.send(HandelStatus(204));
    return;
  }
  let Id = IdData[req.body.k];
  if (!Id) {
    res.send(HandelStatus(404))
    return;
  }
  var students = await (await GetAll());
  var result = await (mapToArr((students as any).result));
  var resPush = await pushData('A1', result, Id)
  res.send(resPush);
};



