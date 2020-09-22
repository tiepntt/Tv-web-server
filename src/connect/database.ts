import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
var config = require("./config");
import { StaticData } from "./staticdata";
import { Role } from "../entity/User/Role";

import { Department } from "../entity/User/Department";
createConnection(config)
  .then(async (connection) => {
    let RoleRepository = connection.getRepository(Role);
    var dataRole = await RoleRepository.find();
    if (dataRole.length === 0) {
      StaticData.Role.forEach(async (roleData) => {
        let role = new Role();
        role.name = roleData.name;
        await RoleRepository.save(role);
      });
    }

    let DepartmentRepository = connection.getRepository(Department);
    var dataDepartment = await DepartmentRepository.find();

    if (dataDepartment.length === 0) {
      StaticData.Department.forEach(async (departmentData) => {
        let department = new Department();
        department.name = departmentData.name;
        await DepartmentRepository.save(department);
      });
    }

    console.log("Connect Database");
  })
  .catch((error) => console.log(error));
