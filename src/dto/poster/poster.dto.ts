import { Expose, Type } from "class-transformer";
import {
  UserInfoTitleDto,
  UserPostTitleDto,
  UserTitleDto,
} from "../user/user.dto";
import { CommentGetDto } from "./comment.dto";
import { LikeGetDto } from "./like.dto";

export class PosterInputDto {
  @Expose()
  urlAssets: string;
  @Expose()
  content: string;
  @Expose()
  userCreateId: number;
  @Expose()
  create_at: Date;
}
export class PosterUpdateDto {
  @Expose()
  id: number;
  @Expose()
  urlAssets: string;
  @Expose()
  content: string;
  @Expose()
  userCreateId: number;
}
export class PosterTitleDto {
  @Expose()
  id: number;
  @Expose()
  urlAssets: string;
  @Expose()
  @Type((type) => UserPostTitleDto)
  userCreate: UserPostTitleDto;
  @Expose()
  content: string;

  @Expose()
  create_at: Date;
  @Expose()
  likes: number;
  @Expose()
  comments: number;
}
export class PosterDetailDto {
  @Expose()
  id: number;
  @Expose()
  urlAssets: string;
  @Expose()
  @Type((type) => UserInfoTitleDto)
  userCreate: UserInfoTitleDto;
  @Expose()
  content: string;
  @Expose()
  @Type((type) => LikeGetDto)
  likes: LikeGetDto[];
  @Expose()
  @Type((type) => CommentGetDto)
  comments: CommentGetDto[];
}
export class PosterNotificationDto {
  @Expose()
  id: number;
}
