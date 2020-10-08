import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { Comment } from "../../entity/Poster/Comment";
import { Like } from "../../entity/Poster/Like";
import { Poster, PosterConfig } from "../../entity/Poster/Poster";
import { User } from "../../entity/User/User";

export const GetAll = async () => {
  let PosterRepo = getRepository(Poster);
  let LikeRepo = getRepository(Like);
  let CommentRepo = getRepository(Comment);
  var posts = await PosterRepo.find();

  var postsRes = [];
  if (posts) {
    posts.forEach(async (post) => {
      var sumLikes = await LikeRepo.count({ poster: post });
      var sumComment = await CommentRepo.count({ poster: post });
      postsRes.push({
        post,
        sumLikes,
        sumComment,
      });
    });
  }
  return HandelStatus(200, null, postsRes);
};
export const Create = async (postConfig: PosterConfig) => {
  let PosterRepo = getRepository(Poster);
  if (
    (!postConfig.content && !postConfig.urlAssets) ||
    !postConfig.userCreateId
  ) {
    return HandelStatus(204);
  }
  var post = new Poster();
  var UserRepo = getRepository(User);

  var user = await UserRepo.findOne({ id: postConfig.userCreateId });
  if (!user) return HandelStatus(204);
  post.userCreate = user;
  post.content = postConfig.content;
  post.createTime = postConfig.createTime;
  post.urlAssets = postConfig.urlAssets || null;
  await PosterRepo.save(post);
  return HandelStatus(200);
};
export const GetByIdDetails = async (id) => {
  let PosterRepo = getRepository(Poster);
  let LikeRepo = getRepository(Like);
  let CommentRepo = getRepository(Comment);
  var post = await PosterRepo.findOne(id);

  var likes = await LikeRepo.createQueryBuilder("like")
    .leftJoin("like.userCreate", "user")
    .select("user.name");
  var comments = await CommentRepo.createQueryBuilder("comment")
    .leftJoin("comment.user", "user")
    .select("comment")
    .addSelect("user.name, user.id");
  return HandelStatus(200, null, { post, likes, comments });
};
export const GetById = async (id) => {
  let PosterRepo = getRepository(Poster);
  var post = await PosterRepo.findOne(id);
  return post;
};
