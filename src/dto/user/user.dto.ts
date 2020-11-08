import { Expose, Type } from "class-transformer";
import { DepartmentTitleDto } from "./department.dto";
import { RoleTitleDto } from "./role.dto";

export class UserInputDto {
  @Expose()
  id?: number;
  @Expose()
  gender: boolean;
  @Expose()
  name?: string;
  @Expose()
  born?: Date;
  @Expose()
  username?: string;
  @Expose()
  password?: string;
  @Expose()
  roleId?: number;
  @Expose()
  departmentId?: number;
  @Expose()
  avatar?: string;
  @Expose()
  GenCode: string;
}
export class UserUpdateInputDto {
  @Expose()
  id?: number;
  @Expose()
  gender: boolean;
  @Expose()
  name?: string;
  @Expose()
  password?: string;
  @Expose()
  born?: Date;
  @Expose()
  avatar: string;
  @Expose()
  GenCode: string;
}
export class UserTitleDto {
  @Expose()
  id?: number;
  @Expose()
  name?: string;
  @Expose()
  born?: Date;
  @Expose()
  @Type((type) => RoleTitleDto)
  role: RoleTitleDto;
  @Expose()
  @Type((type) => DepartmentTitleDto)
  department: DepartmentTitleDto;
  @Expose()
  avatar: string;
  @Expose()
  GenCode: string;
  @Expose()
  gender: boolean;
}
export class UserInfoTitleDto {
  @Expose()
  id?: number;
  @Expose()
  name?: string;
  @Expose()
  GenCode: string;
  @Expose()
  gender: boolean;
}
export class UserPostTitleDto {
  @Expose()
  id?: number;
  @Expose()
  name?: string;
  @Expose()
  @Type((type) => DepartmentTitleDto)
  department: DepartmentTitleDto;
  @Expose()
  avatar: string;
  @Expose()
  GenCode: string;
  @Expose()
  gender: boolean;
}
