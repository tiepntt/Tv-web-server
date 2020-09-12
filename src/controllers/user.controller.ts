import { HandelStatus } from "./HandelAction";

var UserService = require("../CRUD/user");
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
    });
  });
  res.send(HandelStatus(200, null, Data));
};
module.exports.create = async (req, res) => {
  var user = req.body.user;
  if (!user) {
    res.send(HandelStatus(204));
    return;
  }
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
