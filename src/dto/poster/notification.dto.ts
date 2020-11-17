import { Expose, Type } from "class-transformer";
import { Poster } from "../../entity/Poster/Poster";
import { User } from "../../entity/User/User";
import { UserInfoTitleDto, UserNotificationDto } from "../user/user.dto";
import { PosterNotificationDto, PosterTitleDto } from "./poster.dto";

export class NotificationInput {
  context: string;
  poster: Poster;
  creat_at: Date;
  userCreate: User;
  userSubscribe: User[];
}
export class NotificationGetList {
  @Expose()
  notification_id: number;
  @Expose()
  notification_context: string;
  @Expose()
  notification_creat_at: Date;
  @Expose()
  notification_posterId: number;
  @Expose()
  notification_userCreateId: number;
  @Expose()
  userCreate_name: string;
  @Expose()
  isSeen: boolean;
}
export class NotificationSeenDto {
  userId: number;
}
