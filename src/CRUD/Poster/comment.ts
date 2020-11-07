import { plainToClass } from "class-transformer";
import moment = require("moment");
import { getRepository } from "typeorm";
import { mapObject } from "../../../utils/map";
import { HandelStatus } from "../../controllers/HandelAction";
import { CommentGetDto, CommentInputDto } from "../../dto/poster/comment.dto";
import { Comment, commentConfig } from "../../entity/Poster/Comment";
import { Poster } from "../../entity/Poster/Poster";
import { User } from "../../entity/User/User";
import { UserService } from "../User/user";

const Create = async (input: CommentInputDto) => {
  if (!input.posterId || !input.userId || (!input.content && !input.asset)) {
    return HandelStatus(204);
  }
  let CommentRepo = getRepository(Comment);
  var poster = await getRepository(Poster).findOne(input.posterId);
  var user = await UserService.GetUserById(input.userId);
  if (!poster || !user) {
    return HandelStatus(404);
  }
  let comment = plainToClass(Comment, input);
  comment.user = user;
  comment.poster = poster;
  try {
    await CommentRepo.save(comment);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
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
    return HandelStatus(500, e);
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
    return HandelStatus(500, e);
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
    return HandelStatus(500, e);
  }
};
export const CommentService = { Create, Update, Delete, GetById };
