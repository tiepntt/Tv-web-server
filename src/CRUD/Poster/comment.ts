import moment = require("moment");
import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { Comment, commentConfig } from "../../entity/Poster/Comment";
import { User } from "../../entity/User/User";
import { UserService } from "../User/user";
import { GetPoster } from "./poster";


export const Create = async (input: commentConfig) => {
  if (!input.posterId || !input.userId || (!input.content && !input.asset)) {
    
    return HandelStatus(204);
  }
  let CommentRepo = getRepository(Comment);
  let comment = new Comment();
  var poster = await GetPoster(input.posterId);
  var user = await UserService.GetUserById(input.userId);
  if (!poster || !user){
      return HandelStatus(204);
  } 
  comment.content = input.content;
  comment.asset = input.asset;
  comment.createTime = input.createTime;
  comment.poster = poster;
  comment.user = user;
  await CommentRepo.save(comment);
  return HandelStatus(200);
};
export const Update = async (input: commentConfig) => {
  if (!input.id) return HandelStatus(204)
  let CommentRepo = getRepository( Comment );
  let UserRepo = getRepository( User );
  let comment = await CommentRepo.findOne( input.id );
  let user = await UserRepo.findOne(input.userId);
  if (!comment || !user || user != comment.user) return HandelStatus(404)
  comment.asset = input.asset || comment.asset;
  comment.content = input.content || comment.content;

  await CommentRepo.update(input.id, comment);
  return HandelStatus(200);
}
export const Delete = async (input : commentConfig) => {
  if (!input.id) return HandelStatus(204);
  let CommentRepo = getRepository( Comment );
  let UserRepo = getRepository( User );

  let comment = await CommentRepo.findOne( input.id );
  let user = await UserRepo.findOne(input.userId)
  if (!comment || !user || user != comment.user) return HandelStatus(404);
  await CommentRepo.delete(input.id);
  return HandelStatus(200)
}
export const GetById = async (id) => {
  let CommentRepo = getRepository(Comment);
  if (!id) return HandelStatus(204);
  let comment = await CommentRepo.createQueryBuilder("comment")
    .leftJoin( "comment.user", "user" ).select( "comment" )
    .addSelect( "user.id" )
    .addSelect( "user.Name" )
    .where( "comment.id =:id", { id: id } )
    .getOne();
  if ( !comment ) return HandelStatus( 200 );
  return HandelStatus( 200, null, comment );
}

