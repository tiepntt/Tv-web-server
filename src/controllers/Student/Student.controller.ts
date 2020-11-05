import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { BookOrderService } from "../../CRUD/Book/BookOder";
import { StudentService } from "../../CRUD/Student/Student";

import { StudentInpuDto } from "../../dto/student/student.dto";
import { Student } from "../../entity/Student/Student";
import { genBorn } from "../../libs/Book";
import { mapToArr } from "../../libs/Map";
import { AddBySheet } from "../../service/google-api/addStudentBySheest";
import { pushData } from "../../service/google-api/api";
import { getAllData, getId } from "../../service/google-api/crawl-data-student";
import { IdData } from "../../service/Id/id";
import { HandelStatus } from "../HandelAction";

const CreateBySheets = async (req, res) => {
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
      let input = plainToClass(StudentInpuDto, studentConfig);
      if (studentGet) {
        await StudentService.Update(input);
      } else {
        await StudentService.Create(input);
      }
    }
  });
  res.send(HandelStatus(200));
};

const PushToSheets = async (req, res) => {
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
  var students = await StudentService.GetAll();
  var result = await mapToArr((students as any).result);
  var resPush = await pushData("A1", result, Id);
  res.send(resPush);
};
const GetBookBorrowed = async (req, res) => {
  var idStudent = req.params.id;
  var student = await StudentService.GetInfoStudentById(idStudent);
  if (student.status != 200) return res.send(HandelStatus(404));

  var bookBorrowed = await BookOrderService.GetBookOrderBorrowed(idStudent);
  var bookPaid = await BookOrderService.GetBookOrderPaid(idStudent);
  res.send(
    HandelStatus(200, null, {
      studentInfo: student.result,
      bookBorrowed: bookBorrowed,
      bookPaid: bookPaid,
    })
  );
};
const AddToSheet = async (req, res) => {
  var id = req.body.id;
  var k = req.body.k;
  var result = await getAllData(id, k);
  res.send(result);
};
const create = async (req, res) => {
  let studenInput = req.body.student;
  if (!studenInput) return HandelStatus(400);
  let student = plainToClass(StudentInpuDto, studenInput, {
    excludeExtraneousValues: true,
  });
  var result = await StudentService.Create(student);
  res.send(result);
};
const update = async (req, res) => {
  let studenInput = req.body.student;
  if (!studenInput) return HandelStatus(400);
  let student = plainToClass(StudentInpuDto, studenInput, {
    excludeExtraneousValues: true,
  });
  var result = await StudentService.Update(student);
  res.send(result);
};
const remove = async (req, res) => {
  let idStudent = req.params.id;
  let result = await StudentService.removeById(idStudent);
  res.send(result);
};
const getById = async (req, res) => {
  let id = req.params.id;
  let result = await StudentService.GetInfoStudentById(id);
  return res.send(result);
};
export const StudentController = {
  CreateBySheets,
  PushToSheets,
  GetBookBorrowed,
  create,
  AddToSheet,
  update,
  remove,
  getById,
};
