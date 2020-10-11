import { getRepository } from "typeorm";
import {
  GetBookOrderBorrowed,
  GetBookOrderPaid,
} from "../../CRUD/Book/BookOder";
import {
  Create,
  GetAll,
  GetInfoStudentById,
  removeById,
  Update,
} from "../../CRUD/Student/Student";
import { Student } from "../../entity/Student/Student";
import { genBorn } from "../../libs/Book";
import { mapToArr } from "../../libs/Map";
import { AddBySheet } from "../../service/google-api/addStudentBySheest";
import { pushData } from "../../service/google-api/api";
import { getAllData, getId } from "../../service/google-api/crawl-data-student";
import { IdData } from "../../service/Id/id";
import { HandelStatus } from "../HandelAction";

export const CreateBySheets = async (req, res) => {
  let StudentRepo = getRepository(Student);
  if (!req.body.k) {
    res.send(HandelStatus(204));
    return;
  }
  let Id = IdData[req.body.k];
  if (!Id) {
    res.send(HandelStatus(404));
    return;
  }
  let arr = await AddBySheet(Id);
  var data = (arr.result as any).data;
  await (data as any).forEach(async (item, index) => {
    if (index > 0) {
      let studentGet = await StudentRepo.findOne({ idStudent: item[0] });
      let studentConfig = {
        idStudent: item[0],
        name: item[1],
        class: item[3],
        born: genBorn(item[2]),
      };
      if (studentGet) {
        await Update(studentConfig);
      } else {
        await Create(studentConfig);
      }
    }
  });
  res.send(HandelStatus(200));
};

export const PushToSheets = async (req, res) => {
  let StudentRepo = getRepository(Student);
  if (!req.body.k) {
    res.send(HandelStatus(204));
    return;
  }
  let Id = IdData[req.body.k];
  if (!Id) {
    res.send(HandelStatus(404));
    return;
  }
  var students =  await GetAll();
  var result = await mapToArr((students as any).result);
  var resPush = await pushData("A1", result, Id);
  res.send(resPush);
};
export const GetBookBorrowed = async (req, res) => {
  var idStudent = req.params.id;
  var student = await GetInfoStudentById(idStudent);
  if (student.status != 200)  return res.send(HandelStatus(404));

  var bookBorrowed = await GetBookOrderBorrowed(idStudent);
  var bookPaid = await GetBookOrderPaid(idStudent);
  res.send(
    HandelStatus(200, null, {
      studentInfo: student.result,
      bookBorrowed: {
        amount: bookBorrowed.length,
        book: bookBorrowed,
      },
      bookPaid: {
        amount: bookPaid.length,
        book: bookPaid,
      },
    })
  );
};
export const AddToSheet = async (req, res) => {
  var id = req.body.id;
  var k = req.body.k;
  var result = await getAllData(id, k);
  res.send(result);
};
export const create = async ( req, res ) =>
{
  if ( !req.body.studentConfig )
  {
    return res.send(HandelStatus(204));
  }
  var result = await Create( req.body.studentConfig );
  res.send( result );
}
export const update = async ( req, res ) =>
{
  if ( !req.body.studentConfig )
  {
    return res.send(HandelStatus(204));
  }
  var result = await Update( req.body.studentConfig );
  res.send( result );
  
}
export const remove = async ( req, res ) =>
{
  let idStudent = req.params.id;
  let result = await removeById( idStudent );
  res.send( result );
}
export const getById = async ( req, res ) =>
{
  let id = req.params.id;
  let result = await GetInfoStudentById( id );
  return res.send( result );
}

