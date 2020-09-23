import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { Faculty } from "../../entity/Student/Faculty";
import { Student, StudentConfig } from "../../entity/Student/Student";

export const Create = async (studentConfig: StudentConfig) => {
  let StudentRepo = getRepository(Student);
  let FacultyRepo = getRepository(Faculty);
  if (!studentConfig.id || !studentConfig.name) {
    return HandelStatus(204);
  }
  let studentGet = await StudentRepo.findOne(studentConfig.id);
  if (studentGet) {
    return HandelStatus(302);
  }
  let student = new Student();
  student.idStudent = studentConfig.id;
  student.name = studentConfig.name;

  student.class = studentConfig.class || null;
  student.born = new Date(studentConfig.born) || null;
  let faculty = await FacultyRepo.findOne(studentConfig.facultyId || 1);
  if (!faculty) {
    return HandelStatus(404, "Khoa không tồn tại");
  }
  student.faculty = faculty;
  await StudentRepo.save(student);
  return HandelStatus(200);
};
export const Update = async (studentConfig: StudentConfig) => {
    let StudentRepo = getRepository(Student);
  let FacultyRepo = getRepository(Faculty);
  if (!studentConfig.id ) {
    return HandelStatus(204);
  }
  let student = await StudentRepo.findOne(studentConfig.id);
  if (!student) {
    return HandelStatus(404);
  }
  student.idStudent = studentConfig.id;
  student.name = studentConfig.name;

  student.class = studentConfig.class || student.class;;
  student.born = new Date(studentConfig.born) || student.born;
   let faculty = await FacultyRepo.findOne(studentConfig.facultyId || 1);
  if (!faculty) {
    return HandelStatus(404, "Khoa không tồn tại");
  }
  student.faculty = faculty || student.faculty;
  await StudentRepo.update(student.id, student);
  return HandelStatus(200);
}
export const GetAll = async () => {
  let StudentRepo = getRepository(Student);
  var result = await StudentRepo.find();
  return HandelStatus(200, null,result)
}
