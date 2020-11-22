import "reflect-metadata";
import { createConnection } from "typeorm";
let config = require("./config");
import { StaticData } from "./staticdata";
import { Role } from "../entity/User/Role";

import { Department } from "../entity/User/Department";
import { Faculty } from "../entity/Student/Faculty";
import { User } from "../entity/User/User";
import { UserService } from "../CRUD/User/user";
import { plainToClass } from "class-transformer";
import { UserInputDto } from "../dto/user/user.dto";
createConnection(config)
  .then(async (connection) => {
    let qRun = connection.createQueryRunner();

    let RoleRepository = connection.getRepository(Role);
    let dataRole = await RoleRepository.find();
    if (dataRole.length === 0) {
      StaticData.Role.forEach(async (roleData) => {
        let role = new Role();
        role.id = roleData.id;
        role.name = roleData.name;
        role.Code = roleData.code;
        role.isCreateOrEditBook = roleData.isCreateOrEditBook;
        role.isCreateOrEditSheet = roleData.isCreateOrEditSheet;
        role.isCreateOrEditUser = roleData.createOrEditUser;
        role.isSendEmail = roleData.isSendEmail;
        role.isCreateOrEditStudent = roleData.isCreateOrEditStudent;
        role.isCreatePost = roleData.isCreatePost;
        await RoleRepository.save(role);
      });
    }

    let DepartmentRepository = connection.getRepository(Department);
    let dataDepartment = await DepartmentRepository.find();

    if (dataDepartment.length === 0) {
      StaticData.Department.forEach(async (departmentData) => {
        let department = new Department();
        department.id = departmentData.id;
        department.name = departmentData.name;
        department.Code = departmentData.Code;
        await DepartmentRepository.save(department);
      });
    }
    let FacultyRepository = connection.getRepository(Faculty);
    let dataFaculty = await FacultyRepository.find();

    if (dataFaculty.length === 0) {
      StaticData.Faculty.forEach(async (FacultyData) => {
        let faculty = new Faculty();
        faculty.name = FacultyData.name;
        await FacultyRepository.save(faculty);
      });
    }
    let UserRepository = connection.getRepository(User);
    let users = await UserRepository.find();

    if (users.length === 0) {
      StaticData.user.forEach(async (item) => {
        let input = plainToClass(UserInputDto, item);
        let users = await UserService.create(input);
      });
    }

    console.log("Connect Database");
  })
  .catch((error) => console.log(error));
