import { deserialize, plainToClass } from "class-transformer";
import { Any, getRepository, In, IsNull, Like, Not } from "typeorm";
import { mapObject } from "../../utils/map";
import { HandelStatus } from "../../controllers/HandelAction";
import {
  AccountChangePassword,
  UserInputDto,
  UserTitleDto,
  UserUpdateInputDto,
} from "../../dto/user/user.dto";
import { Department } from "../../entity/User/Department";
import { Role } from "../../entity/User/Role";
import { User } from "../../entity/User/User";
import { genPassword } from "../../libs/GenPassword";
import { SendMail } from "../../service/gmail/email";
import { changePasswordForm } from "../../libs/constants/email.form";
import { checkEmail, checkPhoneNumer } from "../../utils/regex";

const create = async (config: UserInputDto) => {
  if (
    !config.name ||
    !config.password ||
    !config.username ||
    !config.roleId ||
    !config.departmentId ||
    !config.email
  ) {
    return HandelStatus(204);
  }
  if (config.phoneNumber && !checkPhoneNumer(config.phoneNumber))
    return HandelStatus(400, "Số điện thoại không hợp lệ.");
  if (!checkEmail(config.email)) return HandelStatus(400, "Email không hợp lệ");
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
  if (!config.id || !userUpdateId) return HandelStatus(204);
  let UserRepo = getRepository(User);
  let user = await UserRepo.findOne({
    relations: ["role", "department"],
    where: { id: config.id },
  });
  if (!user) return HandelStatus(404);

  user = mapObject(user, config);

  // us
  try {
    await UserRepo.update(config.id, user);
    return HandelStatus(200, null, user);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getAll = async (skip: number, take: number, key: string) => {
  let UserRepo = getRepository(User);
  let department = await getRepository(Department).findOne({
    where: {
      name: Like(`%${key}%`),
    },
  });
  let role = await getRepository(Role).findOne({
    where: {
      name: Like(`%${key}%`),
    },
  });
  let condition = [
    {
      name: Like(`%${key}%`),
    },
    {
      department: department,
    },
    {
      role: role,
    },
    {
      GenCode: Like(`%${key}%`),
    },
  ];
  let users = await UserRepo.find({
    relations: ["role", "department"],
    skip: skip || 0,
    take: take || 10,
    where: condition,
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
    return HandelStatus(500);
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
const resetPassword = async (email) => {
  let userRepo = getRepository(User);
  if (!email) return HandelStatus(400);
  let user = await userRepo.findOne({ email: email });
  if (!user) return HandelStatus(404, "Khong ton tai email");
  user.password = genPassword();

  try {
    let textEmail = changePasswordForm({
      to: user.email,
      password: user.password,
      name: user.name,
    });
    let check = await SendMail(textEmail);
    if (check.status == 200) {
      await userRepo.save(user);
      return HandelStatus(
        200,
        `Mật khẩu mới đã được gửi tới email ${user.email}.`
      );
    } else return HandelStatus(500);
  } catch (e) {
    return HandelStatus(500);
  }
};
const changePassword = async (input: AccountChangePassword) => {
  let userRepo = getRepository(User);
  let user = await userRepo.findOne({
    id: input.userId,
    password: input.password,
  });
  if (!user) return HandelStatus(404, "password không đúng");
  user.password = input.newPassword;
  try {
    await userRepo.save(user);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
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
  changePassword,
  resetPassword,
};
