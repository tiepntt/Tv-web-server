import { HandelStatus } from "../HandelAction";
import { __dir } from "../../libs/path";
import { changeRoleOrDepartment, RemoveById } from "../../CRUD/User/user";
import { genBorn } from "../../libs/Book";

var UserService = require("../../CRUD/User/user");
export const getAll = async (req, res) => {
  let users = await UserService.getAll();
  var Data = [];
  await users.forEach((user) => {
    Data.push( {
      id : user.id,
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
export const create = async (req, res) => {
  var userSend = req.body.user;
  var userConfig = {
    name: req.body.name || null,
    userName: req.body.userName || null,
    password: req.body.password || null,
    roleId: req.body.roleId || null,
    departmentId: req.body.departmentId || null,
    born: new Date(req.body.born||null) || null,
  };
  if (!userConfig.name) {
    res.send(HandelStatus(204));
    return;
  }
  
  
  var user = userSend || userConfig;
  user.avatar = req.file ? req.file.path : null;

  var response = await UserService.create(user);
  res.send(response);
};
export const getById = async (req, res) => {
  var id = req.params.id;
  if (!id) {
    res.send(HandelStatus(204, null, id));
    return;
  }
  var response = await UserService.getById(id);
  res.send(response);
};

export const update = async ( req, res ) =>
{
  var userConfig = {
    id: req.body.id || null,
    name: req.body.name || null,
    userName: req.body.userName || null,
    password: req.body.password || null,
    roleId: req.body.roleId || null,
    departmentId: req.body.departmentId || null,
    born: new Date( genBorn(req.body.born) ) || null,
    avatar : req.file ? req.file.path : null
  };

  if ( !userConfig.name) {
    res.send( HandelStatus( 204 ) );
    console.log(userConfig);
    
    return;
  }
  var user = userConfig;

  var response = await UserService.update(user, res.locals.userId);
  res.send(response);
}
export const updateRole = async ( req, res ) =>
{
  let result = await changeRoleOrDepartment( req.body.userConfig );
  res.send(result)
}
export const UploadFile = async (req, res, next) => {
  const processedFile = req.file;

  if (!processedFile) {
    next();
  } else {
    res.locals.filePath = req.file.path;
    next();
  }
};
export const deleteById = async ( req, res ) =>
{
  var id = req.params.id;
  let result = await RemoveById( id );
  res.send( result );
}
const GetNameFile = (str: string) => {
  var nameFile = str.replace("/public", "");
  return nameFile;
};
