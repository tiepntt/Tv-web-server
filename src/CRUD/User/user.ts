import { type } from "os";
import { config } from "process";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
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

export const create = async (config: ConfigUser) => {
  if (
    !config.name ||
    !config.password ||
    !config.userName ||
    !config.roleId ||
    !config.departmentId
  ) {
    console.log("hi");
    return HandelStatus(204);
  }
  let UserRepo = getRepository(User);
  let RoleRepo = getRepository(Role);
  let DepartmentRepo = getRepository(Department);

  let user = new User();
  user.Name = config.name;
  user.born = config.born||new Date("2000-20-06");
  user.username = config.userName;
  user.password = config.password;
  user.avatar =
    config.avatar ||
    "https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg";

  let role = await RoleRepo.findOne({ id: config.roleId });

  let department = await DepartmentRepo.findOne({
    id: config.departmentId,
  });

  if (!role || !department) {
    return HandelStatus(404);
  }

  user.role = role;
  user.department = department;
  await UserRepo.save(user);
  return HandelStatus(200);
};
export const update = async ( config: ConfigUser, userUpdateId ) =>
{
  console.log(config);
  
  if ( !config.id  || !userUpdateId) return HandelStatus( 204 );
  let UserRepo = getRepository( User );
  let user = await UserRepo.findOne( config.id );
  let userUpdate = await UserRepo.createQueryBuilder("user").leftJoinAndSelect("user.role", "role").where("user.id=:id", {id : userUpdateId}).getOne();
  if ( !user || !userUpdate || userUpdate != user && userUpdate.role.isCreateOrEditUser == false )
  {
    console.log(user, userUpdate);
    
    return HandelStatus( 404 );
  }
  user.Name = config.name || user.Name;
  user.avatar = config.avatar || user.avatar;
  user.born = config.born || user.born;
  await UserRepo.update( config.id, user );
  return HandelStatus( 200 );
}
export const getAll = async () => {
  let UserRepo = getRepository(User);
  let users = await UserRepo.createQueryBuilder("user")
    .leftJoinAndSelect("user.role", "role")
    .leftJoinAndSelect("user.department", "department")
    .getMany();

  return users;
};
export const getById = async (_id: string) => {
  let UserRepo = getRepository(User);
  let user = await UserRepo.createQueryBuilder("user")
    .leftJoinAndSelect("user.role", "role")
    .leftJoinAndSelect("user.department", "department")
    .where("user.id = :id", { id: _id })
    .getOne();
  if (!user) {
    return HandelStatus(404, null, user);
  }

  return HandelStatus( 200, null, {
    id : user.id,
    name: user.Name,
    born: user.born,
    department: user.department.name,
    avatar: user.avatar,
  });
};
export const getUserByAccount = async (username, password) => {
  let UserRepo = getRepository(User);
  // let user = await UserRepo.findOne({ username: username, password: password })
  let user = await UserRepo.createQueryBuilder("user")
    .leftJoinAndSelect("user.role", "role")
    .where("user.username =:username", { username: username })
    .andWhere("user.password =:password ", { password: password })
    .getOne();
  return user;
};
const DateConfig = (dateString: string) => {
  // if (!dateString) {
  //   return;
  // }
  // return date;
};
export const GetUserById = async (id) => {
  let UserRepo = getRepository(User);
  let user = await UserRepo.findOne(id);
  return user;
};
export const changeRoleOrDepartment = async ( input : ConfigUser ) =>
{
  
  if ( !input.id || !input.roleId || !input.departmentId) return HandelStatus( 204 );
  let UserRepo = getRepository( User );
  let RoleRepo = getRepository( Role );
  let DepartmentRepo = getRepository( Department );
  let user = await UserRepo.findOne( input.id );
  let role = await RoleRepo.findOne( input.roleId );
  let department = await DepartmentRepo.findOne( input.departmentId );
  if ( !user || !role || !department ) return HandelStatus( 404 );
  user.role = role || user.role;
  user.department = department || user.department;
  await UserRepo.update( input.id, user );
  return HandelStatus( 200 );
}
export const RemoveById = async ( id ) =>
{
  let UserRepo = getRepository( User );
  let user = await UserRepo.findOne( id );
  if ( !user ) return HandelStatus( 404 );
  await UserRepo.remove( user );
  return HandelStatus( 200 );
}
