import { deserialize } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { RoleTitleDto } from "../../dto/user/role.dto";

import { Role } from "../../entity/User/Role";

module.exports.create = async (config) => { };

export const getAll = async () =>
{ 
  let RoleRepo = getRepository( Role );
  let roles = await RoleRepo.find();
  try {
    let result = deserialize(RoleTitleDto, JSON.stringify(roles), {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
