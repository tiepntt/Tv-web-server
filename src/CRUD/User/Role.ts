import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";

import { Role } from "../../entity/User/Role";

module.exports.create = async (config) => { };

export const getAll = async () =>
{ 
  let RoleRepo = getRepository( Role );
  let roles = await RoleRepo.createQueryBuilder( "role" )
    .select( "role.name" )
    .addSelect( "role.Code" )
    .addSelect( "role.id" ).getMany();
  return HandelStatus( 200, null, roles );
};
module.exports.addUser = async (_id: number, user) => {
  let RoleRepo = getRepository(Role);
  let role = await RoleRepo.findOne({ id: _id });
  if (!role) {
    return HandelStatus(404);
  }
  role.users.push(user);
  return HandelStatus(200);
};
