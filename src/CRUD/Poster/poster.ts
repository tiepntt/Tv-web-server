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
  var posts = await PosterRepo.createQueryBuilder("poster").orderBy("poster.createTime", "DESC").getMany();

  var postsRes = [];
  if (posts) {
    for (let i = 0; i < posts.length; i++){
      var post = posts[i];
      var sumLikes = await LikeRepo.count({ poster: post });
      var sumComment = await CommentRepo.count({ poster: post });
       postsRes.push({
         post,
         createTime: post.createTime.toLocaleString(),
        likes : sumLikes,
        comments : sumComment,
      })
    };
    return HandelStatus(200, null, postsRes);
  }
  else {
    return HandelStatus(200, null, postsRes);
  }
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
  var post = await PosterRepo
    .createQueryBuilder("post")
    .leftJoin("post.userCreate", "user")
    .select("post").addSelect("user.id").
    addSelect("user.Name")
    .where("post.id =:id", {id : id}).getOne();

  var likes = await LikeRepo.createQueryBuilder("like")
    .leftJoin("like.user", "user")
    .select("like")
    .leftJoin("like.poster", "poster")
    .addSelect("user.id")
    .addSelect("user.Name")
    .where("poster.id =:id", { id: id })
    .getMany();
  var comments = await CommentRepo.createQueryBuilder("comment")
    .leftJoin("comment.user", "user")
    .select("comment").addSelect("user.id")
    .addSelect("user.Name")
    .leftJoin("comment.poster", "poster")
    .where("poster.id =:id", {id : id})
    .orderBy("comment.createTime", "ASC").getMany();
  console.log({ post, likes, comments });

  return HandelStatus(200, null, { post, likes, comments });
};
export const GetById = async (id) => {
  let PosterRepo = getRepository(Poster);
  var post = await PosterRepo.findOne(id);
  return post;
};
export const UpdateById = async (input: PosterConfig) => {
  let posterRepo = getRepository( Poster );
  let userRepo = getRepository( User );
  if (!input.id) { return HandelStatus(204); }
  let poster = await posterRepo.findOne( input.id );
  let user = await userRepo.findOne( input.userCreateId );
  if (!poster || !user || user != poster.userCreate) return HandelStatus(404);
  poster.content = input.content || poster.content;
  poster.urlAssets = input.urlAssets || poster.urlAssets;

  await posterRepo.update(input.id, poster);
  return HandelStatus(200);
}
export const DeleteById = async( input : PosterConfig) => {
  let posterRepo = getRepository( Poster );
  let userRepo = getRepository( User );
  let user = await userRepo.findOne( input.userCreateId );
  if (!input.id) { return HandelStatus(204); }
  let poster = await posterRepo.findOne(input.id);
  if (!poster|| !user || user != poster.userCreate) return HandelStatus(404);

  await posterRepo.delete(input.id)
  return HandelStatus(200);
}
export const GetPoster = async ( id ) =>
{
  let PosterRepo = getRepository( Poster );
  let poster = await PosterRepo.findOne( id );
  if ( !poster ) return;
  return poster;
}
