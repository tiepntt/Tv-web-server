import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { Comment, commentConfig } from "../../entity/Poster/Comment";
import { GetUserById } from "../User/user";
import { GetById } from "./poster";

export const Create = async (input: commentConfig) => {
  if (!input.posterId || !input.userId || (!input.content && !input.asset))
    return HandelStatus(204);
  let CommentRepo = getRepository(Comment);
  let comment = new Comment();
  var poster = await GetById(input.posterId);
  var user = await GetUserById(input.userId);
  if (!poster || !user) return HandelStatus(204);

  comment.content = input.content;
  comment.asset = input.asset;
  comment.createTime = input.createTime;
  comment.poster = poster;
  comment.user = user;
  await CommentRepo.save(comment);
  return HandelStatus(200);
};
