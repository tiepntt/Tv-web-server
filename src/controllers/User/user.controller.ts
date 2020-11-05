import { HandelStatus } from "../HandelAction";
import { __dir } from "../../libs/path";
import { UserService } from "../../CRUD/User/user";
import { genBorn } from "../../libs/Book";
import { plainToClass } from "class-transformer";
import { UserInputDto, UserUpdateInputDto } from "../../dto/user/user.dto";

const getAll = async (req, res) => {
  let result = await UserService.getAll();
  return res.send(result);
};
const create = async (req, res) => {
  var userSend = req.body;
  let user = plainToClass(UserInputDto, userSend);
  user.born = user.born || new Date();
  user.avatar = req.file ? req.file.path : undefined;
  var response = await UserService.create(user);
  res.send(response);
};
const getById = async (req, res) => {
  var id = req.params.id;
  if (!id) {
    res.send(HandelStatus(204, null, id));
    return;
  }
  var response = await UserService.getById(id);
  res.send(response);
};

const update = async (req, res) => {
  let body = req.body;
  let userConfig = plainToClass(UserUpdateInputDto, body, {
    excludeExtraneousValues: true,
  });
  userConfig.avatar = req.file ? req.file.path : undefined;
  console.log(userConfig);
  userConfig.id = res.locals ? res.locals.userId : undefined;
  if (!userConfig.name) {
    res.send(HandelStatus(204));
    console.log(userConfig);
    return;
  }
  var user = userConfig;
  var response = await UserService.update(user, res.locals.userId);
  res.send(response);
};
const updateRole = async (req, res) => {
  let result = await UserService.changeRoleOrDepartment(req.body.userConfig);
  res.send(result);
};
const UploadFile = async (req, res, next) => {
  const processedFile = req.file;

  if (!processedFile) {
    next();
  } else {
    res.locals.filePath = req.file.path;
    next();
  }
};
const deleteById = async (req, res) => {
  var id = req.params.id;
  let result = await UserService.RemoveById(id);
  res.send(result);
};
const GetNameFile = (str: string) => {
  var nameFile = str.replace("/public", "");
  return nameFile;
};
export const UserController = {
  getAll,
  create,
  getById,
  update,
  updateRole,
  UploadFile,
  deleteById,
};
