import { plainToClass } from "class-transformer";
import moment = require("moment");
import { getRepository } from "typeorm";
import { mapObject } from "../../utils/map";
import { HandelStatus } from "../../controllers/HandelAction";
import { CommentGetDto, CommentInputDto } from "../../dto/poster/comment.dto";
import { Comment, commentConfig } from "../../entity/Poster/Comment";
import { Poster } from "../../entity/Poster/Poster";
import { User } from "../../entity/User/User";
import { UserService } from "../User/user";
import { NotificationInput } from "../../dto/poster/notification.dto";
import { chat } from "googleapis/build/src/apis/chat";
import { PosterService } from "./poster";
import { NotificationService } from "./notification";
import { posix } from "path";

const Create = async (input: CommentInputDto) => {
  if (!input.posterId || !input.userId || (!input.content && !input.asset)) {
    return HandelStatus(204);
  }
  let CommentRepo = getRepository(Comment);
  let poster = await getRepository(Poster).findOne({
    relations: ["userSubscribe"],
    where: {
      id: input.posterId,
    },
  });
  let user = await UserService.GetUserById(input.userId);
  if (!poster || !user) {
    return HandelStatus(404);
  }
  let comment = plainToClass(Comment, input);
  comment.user = user;
  comment.poster = poster;
  try {
    await CommentRepo.save(comment);
    try {
      if (poster.userSubscribe.find((o) => o.id === user.id) == null) {
        poster.userSubscribe.push(user);
      }

      getRepository(Poster).save(poster);
      let notification = new NotificationInput();
      notification.context = "Đã thêm 1 bình luận";
      notification.userCreate = user;
      notification.poster = poster;
      notification.userSubscribe = poster.userSubscribe.filter(
        (o) => o.id != user.id
      );

      NotificationService.create(notification);
    } catch (e) {
      console.log(e);
    }

    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const Update = async (input: CommentInputDto) => {
  if (!input.id) return HandelStatus(204);
  let CommentRepo = getRepository(Comment);
  let user = await getRepository(User).findOne(input.userId);
  let comment = await CommentRepo.findOne({ id: input.id, user: user });
  if (!comment) return HandelStatus(303);
  comment = mapObject(comment, input);
  try {
    await CommentRepo.update(input.id, comment);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const Delete = async (input: CommentInputDto) => {
  if (!input.id) return HandelStatus(204);
  let CommentRepo = getRepository(Comment);
  let UserRepo = getRepository(User);
  let user = (await UserRepo.findOne(input.userId)) || undefined;
  let comment = await CommentRepo.findOne({ user: user, id: input.id });

  if (!comment) return HandelStatus(404);
  try {
    await CommentRepo.delete(input.id);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const GetById = async (id) => {
  let CommentRepo = getRepository(Comment);
  if (!id) return HandelStatus(204);
  let comment = await CommentRepo.findOne({
    relations: ["user"],
    where: {
      id: id,
    },
  });
  if (!comment) return HandelStatus(404);
  try {
    let result = plainToClass(CommentGetDto, comment, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
const getAllByPosterId = async (posterId: number) => {
  let poster = await getRepository(Poster).findOne(posterId || -1);
  if (!poster) return HandelStatus(404, "Poster not found");
  let comments = await getRepository(Comment).find({
    relations: ["user"],
    where: { poster: poster },
    order: {
      create_at: "ASC",
    },
  });
  try {
    let result = plainToClass(CommentGetDto, comments, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
export const CommentService = {
  Create,
  Update,
  Delete,
  GetById,
  getAllByPosterId,
};
