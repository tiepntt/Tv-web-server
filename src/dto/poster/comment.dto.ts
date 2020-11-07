import { Expose, Type } from "class-transformer";
import { UserInfoTitleDto, UserTitleDto } from "../user/user.dto";

export class CommentInputDto {
  @Expose()
  id: number;
  @Expose()
  content: string;
  @Expose()
  asset: string;
  @Expose()
  posterId: number;
  @Expose()
  userId: number;
}
export class CommentGetDto {
  @Expose()
  id: number;
  @Expose()
  content: string;
  @Expose()
  asset: string;
  @Expose()
  @Type((o) => UserInfoTitleDto)
  user: UserInfoTitleDto;
  @Expose()
  create_at: Date;
}
