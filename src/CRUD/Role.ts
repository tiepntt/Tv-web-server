import { getRepository } from "typeorm";
import { HandelStatus } from "../controllers/HandelAction";

import { Role } from "../entity/Role";
import { User } from "../entity/User";

module.exports.create = async (config) => {};

module.exports.getAll = async () => {};
module.exports.addUser = async (_id: number, user) => {
  let RoleRepo = getRepository(Role);
  let role = await RoleRepo.findOne({ id: _id });
  if (!role) {
    return HandelStatus(404);
  }
  role.users.push(user);
  return HandelStatus(200);
};
