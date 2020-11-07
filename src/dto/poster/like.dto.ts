import { Expose, Type } from "class-transformer";
import { UserInfoTitleDto } from "../user/user.dto";

export class LikeGetDto {
  @Expose()
  @Type((o) => UserInfoTitleDto)
  user: UserInfoTitleDto;
  @Expose()
  create_at: Date;
}
export class LikeInputDto {
  @Expose()
  posterId: number;
  @Expose()
  create_at: Date;
  @Expose()
  userId: number;
}
