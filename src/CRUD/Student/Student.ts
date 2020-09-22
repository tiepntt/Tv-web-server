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
