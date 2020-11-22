import { Expose, Type } from "class-transformer";
import { NotificationGetList } from "../poster/notification.dto";
import { DepartmentTitleDto } from "./department.dto";
import { RoleDto, RoleTitleDto } from "./role.dto";

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
  email?: string;
  @Expose()
  phoneNumber?: string;
  @Expose()
  password?: string;
  @Expose()
  roleId?: number;
  @Expose()
  roleCode?: string;
  @Expose()
  departmentId?: number;
  @Expose()
  departmentCode?: number;
  @Expose()
  avatar?: string;
  @Expose()
  GenCode: string;
  @Expose()
  isBlock: boolean;
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
  phoneNumber?: string;
  @Expose()
  born?: Date;
  @Expose()
  avatar: string;
  @Expose()
  GenCode: string;
  @Expose()
  email?: string;
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
  @Expose()
  email?: string;
  @Expose()
  phoneNumber?: string;
  @Expose()
  isBlock: boolean;
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
  @Expose()
  isBlock: boolean;
  @Expose()
  avatar: string;
}
export class UserNotificationDto {
  @Expose()
  id?: number;
  @Expose()
  name?: string;
  @Expose()
  @Type((o) => NotificationGetList)
  notificationSeen: NotificationGetList[];
  @Expose()
  @Type((o) => NotificationGetList)
  notificationSubscribe: NotificationGetList[];
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
  @Expose()
  email?: string;
  @Expose()
  phoneNumber?: string;
}
export class UserAccountDto {
  @Expose()
  id?: number;
  @Expose()
  name?: string;
  @Expose()
  born?: Date;
  @Expose()
  @Type((type) => RoleDto)
  role: RoleDto;
  @Expose()
  @Type((type) => DepartmentTitleDto)
  department: DepartmentTitleDto;
  @Expose()
  avatar: string;
  @Expose()
  GenCode: string;
  @Expose()
  gender: boolean;
  @Expose()
  email?: string;
  @Expose()
  phoneNumber?: string;
}
export class AccountChangePassword {
  @Expose()
  userId: number;
  @Expose()
  password: string;
  @Expose()
  newPassword: string;
}
export class UserInputSheetDto {
  @Expose()
  gender: boolean;
  @Expose()
  name?: string;
  @Expose()
  born?: Date;
  @Expose()
  username?: string;
  @Expose()
  email?: string;
  @Expose()
  phoneNumber?: string;
  @Expose()
  password?: string;
  @Expose()
  roleCode?: string;
  @Expose()
  departmentCode?: string;
  @Expose()
  avatar?: string;
  @Expose()
  GenCode: string;
}
