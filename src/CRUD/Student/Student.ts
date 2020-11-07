import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { mapObject } from "../../utils/map";
import { HandelStatus } from "../../controllers/HandelAction";
import { StudentInpuDto } from "../../dto/student/student.dto";
import { Faculty } from "../../entity/Student/Faculty";
import { Student } from "../../entity/Student/Student";

const Create = async (studentConfig: StudentInpuDto) => {
  let StudentRepo = getRepository(Student);
  let FacultyRepo = getRepository(Faculty);

  if (!studentConfig.idStudent || !studentConfig.name) {
    return HandelStatus(204);
  }
  let studentGet = await StudentRepo.findOne({
    idStudent: studentConfig.idStudent,
  });
  if (studentGet) {
    return HandelStatus(302);
  }
  let student = plainToClass(Student, studentConfig);
  let faculty = await FacultyRepo.findOne(studentConfig.facultyId || 1);
  if (!faculty) {
    return HandelStatus(404, "Khoa không tồn tại");
  }
  student.faculty = faculty;
  try {
    await StudentRepo.save(student);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const Update = async (studentConfig: StudentInpuDto) => {
  let StudentRepo = getRepository(Student);
  let FacultyRepo = getRepository(Faculty);
  if (!studentConfig.id && !studentConfig.idStudent) {
    return HandelStatus(204);
  }
  let student = await StudentRepo.findOne({
    idStudent: studentConfig.idStudent,
  });
  if (!student) {
    return HandelStatus(404);
  }
  student = mapObject(student, studentConfig);
  let faculty = await FacultyRepo.findOne(studentConfig.facultyId || 1);
  if (!faculty) {
    return HandelStatus(404, "Khoa không tồn tại");
  }
  student.faculty = faculty || student.faculty;
  try {
    await StudentRepo.update(student.id, student);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const GetAll = async () => {
  let StudentRepo = getRepository(Student);
  var result = await StudentRepo.find();
  return HandelStatus(200, null, result);
};

const removeById = async (id) => {
  let StudentRepo = getRepository(Student);
  let student = await StudentRepo.findOne({ idStudent: id });
  if (!student) return HandelStatus(404);

  try {
    await StudentRepo.remove(student);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const GetBookOrderById = async (studentId) => {
  let StudentRepo = getRepository(Student);
};
const GetInfoStudentById = async (idStudent) => {
  let StudentRepo = getRepository(Student);
  var student = await StudentRepo.findOne({ idStudent: idStudent });
  if (!student) return HandelStatus(404);
  return HandelStatus(200, null, student);
};
export const StudentService = {
  Create,
  Update,
  GetAll,
  removeById,
  GetBookOrderById,
  GetInfoStudentById,
};
