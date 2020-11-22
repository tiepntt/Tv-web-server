import { Expose } from "class-transformer";

export class RoleDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  Code: string;
  @Expose()
  isSendEmail: boolean;
  @Expose()
  isCreateOrEditSheet: boolean;
  @Expose()
  isCreateOrEditBook: boolean;
  @Expose()
  isCreateOrEditUser: boolean;
  @Expose()
  isCreateOrEditStudent: boolean;
  @Expose()
  isCreatePost: boolean;
}
export class RoleTitleDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  Code: string;
}
