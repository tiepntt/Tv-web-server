import { HandelStatus } from "../HandelAction";
import { __dir } from "../../libs/path";
import { UserService } from "../../CRUD/User/user";
import { plainToClass } from "class-transformer";
import {
  UserInputDto,
  UserInputSheetDto,
  UserUpdateInputDto,
} from "../../dto/user/user.dto";
import { getRepository } from "typeorm";
import { User } from "../../entity/User/User";
import { AddBySheet } from "../../service/google-api/addStudentBySheest";
import { genBorn } from "../../libs/Book";
import { genPassword } from "../../libs/GenPassword";
import { mapObject } from "../../utils/map";

const getAll = async (req, res) => {
  let skip = req.params.skip || 0;
  let take = req.params.take || 10;
  let key = req.query.search || "";

  let result = await UserService.getAll(skip, take, key);
  return res.send(result);
};
const create = async (req, res) => {
  let userSend = req.body;
  let user = plainToClass(UserInputDto, userSend);
  user.born = user.born || new Date();
  user.avatar = req.file ? req.file.path : undefined;
  let response = await UserService.create(user);
  res.send(response);
};
const getById = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.send(HandelStatus(204, null, id));
    return;
  }
  let response = await UserService.getById(id);
  res.send(response);
};

const update = async (req, res) => {
  let body = req.body;
  let userConfig = plainToClass(UserUpdateInputDto, body, {
    excludeExtraneousValues: true,
  });
  userConfig.avatar = req.file ? req.file.path : undefined;
  userConfig.id = res.locals ? res.locals.userId : undefined;
  if (!userConfig.name) {
    res.send(HandelStatus(204));
    return;
  }
  let user = userConfig;
  let response = await UserService.update(user, res.locals.userId);
  res.send(response);
};
const updateRole = async (req, res) => {
  let user = req.body.user;
  if (!user) return HandelStatus(400);
  let userInput = plainToClass(UserInputDto, user, {
    excludeExtraneousValues: true,
  });
  let result = await UserService.changeRoleOrDepartment(userInput);
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
  let id = req.params.id;
  let result = await UserService.RemoveById(id);
  res.send(result);
};
const GetNameFile = (str: string) => {
  let nameFile = str.replace("/public", "");
  return nameFile;
};
const CreateBySheets = async (req, res) => {
  let UserRepo = getRepository(User);
  if (!req.body.idSheet) {
    res.send(HandelStatus(204));
    return;
  }
  let Id = req.body.idSheet;
  if (!Id) {
    res.send(HandelStatus(404));
    return;
  }
  let arr = await AddBySheet(Id);
  let data = (arr.result as any).data;
  let result = { success: 0, fail: 0 };
  for (let index = 0; index < data.length; index++) {
    let item = data[index];

    if (index > 0) {
      let userGet = await UserRepo.findOne({ email: item[6] });
      let user = {
        username: item[7],
        password: genPassword(),
        name: item[1],
        born: new Date(genBorn(item[2])),
        departmentCode: item[3],
        gender: item[4] || false,
        GenCode: item[5],
        phoneNumber: item[6],
        email: item[7],
        roleCode: item[8],
      } as UserInputDto;
      let input = plainToClass(UserInputDto, user);
      let r = await UserService.create(input);
      if (r.status == 200) {
        result.success++;
      } else {
        result.fail++;
        console.log(r.status == 400 ? input : null);
      }
    }
  }
  res.send(HandelStatus(200, null, result));
};
const blockUser = async (req, res) => {
  let userId = req.body.userId;
  let result = await UserService.blockUser(userId || -1);
  return res.send(result);
};
export const UserController = {
  getAll,
  create,
  getById,
  update,
  updateRole,
  UploadFile,
  deleteById,
  CreateBySheets,
  blockUser,
};
