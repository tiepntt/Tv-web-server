import { HandelStatus } from "../HandelAction";
import { __dir } from "../../libs/path";
var fs = require("fs");

var UserService = require("../../CRUD/User/user");
module.exports.getAll = async (req, res) => {
  let users = await UserService.getAll();
  var Data = [];
  await users.forEach((user) => {
    Data.push({
      name: user.Name,
      userName: user.username,
      role: user.role.name,
      department: user.department.name,
      born: user.born,
      avatar: user.avatar,
    });
  });
  res.send(HandelStatus(200, null, Data));
};
module.exports.create = async (req, res) => {
  var userSend = req.body.user;
  var userConfig = {
    name: req.body.name || null,
    userName: req.body.userName || null,
    password: req.body.password || null,
    roleId: req.body.roleId || null,
    departmentId: req.body.departmentId || null,
    born: req.body.born || null,
  };

  if (!userSend && !userConfig.name) {
    res.send(HandelStatus(204));
    return;
  }
  var user = userSend || userConfig;
  user.avatar = res.locals.fileName;

  var response = await UserService.create(user);
  res.send(response);
};
module.exports.getById = async (req, res) => {
  var id = req.params.id;
  console.log(id);

  if (!id) {
    res.send(HandelStatus(204, null, id));
    return;
  }
  var response = await UserService.getById(id);
  res.send(response);
};
module.exports.UploadFile = async (req, res, next) => {
  const processedFile = req.file;

  if (!processedFile) {
    next();
  } else {
    // let orgName = processedFile.originalname || "";
    // // Tên gốc trong máy tính của người upload
    // orgName = orgName.trim().replace(/ /g, "-");
    // const fullPathInServ = processedFile.path;
    // // Đường dẫn đầy đủ của file vừa đc upload lên server
    // // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    // const newFullPath = `${fullPathInServ}-${orgName}`;

    // var nameFile = newFullPath.split("\\");
    // var path = __dir + nameFile[nameFile.length - 1];
    // var path2 = GetNameFile(path);

    // fs.renameSync(fullPathInServ, newFullPath);
    // res.locals.fileName = path2;

    res.locals.filePath = req.file.path;
    // next();
    next();
  }
};
const GetNameFile = (str: string) => {
  var nameFile = str.replace("/public", "");
  return nameFile;
};
