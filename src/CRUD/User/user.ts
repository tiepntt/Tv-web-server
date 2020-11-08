import { deserialize, plainToClass } from "class-transformer";
import { type } from "os";
import { config } from "process";
import { getRepository } from "typeorm";
import { deflateRawSync } from "zlib";
import { mapObject } from "../../utils/map";
import { HandelStatus } from "../../controllers/HandelAction";
import {
  UserInputDto,
  UserTitleDto,
  UserUpdateInputDto,
} from "../../dto/user/user.dto";
import { Department } from "../../entity/User/Department";
import { Role } from "../../entity/User/Role";
import { User } from "../../entity/User/User";

type ConfigUser = {
  id?: number;
  name?: string;
  born?: Date;
  userName?: string;
  password?: string;
  roleId?: number;
  departmentId?: number;
  avatar?: string;
};

const create = async (config: UserInputDto) => {
  if (
    !config.name ||
    !config.password ||
    !config.username ||
    !config.roleId ||
    !config.departmentId
  ) {
    return HandelStatus(204);
  }
  let UserRepo = getRepository(User);
  let RoleRepo = getRepository(Role);
  let userGet = await UserRepo.findOne({ username: config.username });
  if (userGet) return HandelStatus(302, "tên đăng nhập đã được sử dụng");
  let DepartmentRepo = getRepository(Department);
  let user = plainToClass(User, config);
  let role = await RoleRepo.findOne(config.roleId);
  let department = await DepartmentRepo.findOne(config.departmentId);
  if (!role || !department) {
    return HandelStatus(404);
  }
  user.role = role;
  user.department = department;
  try {
    await UserRepo.save(user);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const update = async (config: UserUpdateInputDto, userUpdateId) => {
  console.log(config);

  if (!config.id || !userUpdateId) return HandelStatus(204);
  let UserRepo = getRepository(User);
  let user = await UserRepo.findOne(config.id);
  if (!user) return HandelStatus(404);
  user = mapObject(user, config);
  // us
  try {
    await UserRepo.update(config.id, user);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getAll = async (skip: number, take: number) => {
  let UserRepo = getRepository(User);
  let users = await UserRepo.find({
    relations: ["role", "department"],
    skip: skip || 0,
    take: take || 10,
    order: {
      create_at: "DESC",
    },
  });
  try {
    let result = deserialize(UserTitleDto, JSON.stringify(users), {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getById = async (_id: string) => {
  let UserRepo = getRepository(User);
  let user = await UserRepo.findOne({
    relations: ["department", "role"],
    where: {
      id: _id,
    },
  });
  if (!user) {
    return HandelStatus(404);
  }
  let result = deserialize(UserTitleDto, JSON.stringify(user), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, result);
};
const getUserByAccount = async (username, password) => {
  let UserRepo = getRepository(User);
  let user = await UserRepo.findOne({
    relations: ["role", "department"],
    where: { username: username, password: password },
  });
  return user;
};
const GetUserById = async (id) => {
  let UserRepo = getRepository(User);
  let user = await UserRepo.findOne(id);
  return user;
};
const changeRoleOrDepartment = async (input: UserInputDto) => {
  if (!input.id || !input.roleId || !input.departmentId)
    return HandelStatus(204);
  let UserRepo = getRepository(User);
  let RoleRepo = getRepository(Role);
  let DepartmentRepo = getRepository(Department);
  let user = await UserRepo.findOne(input.id);
  let role = await RoleRepo.findOne(input.roleId);
  let department = await DepartmentRepo.findOne(input.departmentId);
  if (!user || !role || !department) return HandelStatus(404);
  user.role = role || user.role;
  user.department = department || user.department;
  try {
    await UserRepo.update(input.id, user);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const RemoveById = async (id) => {
  let UserRepo = getRepository(User);
  let user = await UserRepo.findOne(id);
  if (!user) return HandelStatus(404);
  await UserRepo.remove(user);
  return HandelStatus(200);
};
export const UserService = {
  create,
  update,
  getAll,
  getById,
  getUserByAccount,
  GetUserById,
  changeRoleOrDepartment,
  RemoveById,
};
