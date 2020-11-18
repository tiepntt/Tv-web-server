import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { mapObject } from "../../utils/map";
import { HandelStatus } from "../../controllers/HandelAction";
import {
  PosterDetailDto,
  PosterInputDto,
  PosterTitleDto,
  PosterUpdateDto,
} from "../../dto/poster/poster.dto";
import { Poster } from "../../entity/Poster/Poster";
import { User } from "../../entity/User/User";
import { NotificationService } from "./notification";
import { NotificationInput } from "../../dto/poster/notification.dto";

const GetAll = async (take, skip) => {
  let PosterRepo = getRepository(Poster);
  let posters = await PosterRepo.createQueryBuilder("poster")
    .loadRelationCountAndMap("poster.comments", "poster.comments")
    .loadRelationCountAndMap("poster.likes", "poster.likes")
    .leftJoinAndSelect("poster.userCreate", "userCreate")
    .leftJoinAndSelect("userCreate.department", "department")
    .take(take || 10)
    .skip(skip || 0)
    .getMany();
  try {
    let result = plainToClass(PosterTitleDto, posters, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const Create = async (postConfig: PosterInputDto) => {
  let PosterRepo = getRepository(Poster);
  if (
    (!postConfig.content && !postConfig.urlAssets) ||
    !postConfig.userCreateId
  ) {
    return HandelStatus(204);
  }
  let UserRepo = getRepository(User);

  let user = await UserRepo.findOne({ id: postConfig.userCreateId });
  if (!user) return HandelStatus(204);
  let post = plainToClass(Poster, postConfig);
  post.userCreate = user;
  post.userSubscribe = [user];
  try {
    await PosterRepo.save(post);
    let notification = new NotificationInput();
    notification.context = "Đã thêm 1 bài đăng.";
    notification.poster = post;
    notification.userSubscribe = await UserRepo.find();
    notification.userSubscribe = notification.userSubscribe.filter(
      (o) => o.id != user.id
    );
    notification.userCreate = user;
    NotificationService.create(notification);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const GetById = async (id: number) => {
  let PosterRepo = getRepository(Poster);
  let post = await PosterRepo.createQueryBuilder("poster")
    .leftJoinAndSelect("poster.userCreate", "userCreate")
    .leftJoinAndSelect("poster.comments", "comments")
    .leftJoinAndSelect("poster.likes", "likes")
    .leftJoinAndSelect("comments.user", "comment.user")
    .leftJoinAndSelect("likes.user", "likes.user")
    .where("poster.id=:id", { id: id })
    .getOne();
  try {
    let result = plainToClass(PosterDetailDto, post, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
const UpdateById = async (input: PosterUpdateDto) => {
  let posterRepo = getRepository(Poster);
  let userRepo = getRepository(User);
  if (!input.id) {
    return HandelStatus(204);
  }
  let user = (await userRepo.findOne(input.userCreateId)) || undefined;
  let poster = await posterRepo.findOne({ id: input.id, userCreate: user });
  if (!poster) return HandelStatus(404);

  poster = mapObject(poster, input);

  try {
    await posterRepo.update(input.id, poster);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const DeleteById = async (input: PosterUpdateDto) => {
  let posterRepo = getRepository(Poster);
  let userRepo = getRepository(User);
  if (!input.id || !input.userCreateId) return HandelStatus(400);
  if (!input.id) {
    return HandelStatus(204);
  }
  let user = await userRepo.findOne(input.userCreateId);

  let poster = await posterRepo.findOne({
    relations: ["userCreate"],
    where: { id: input.id, userCreate: user },
  });
  if (!poster) return HandelStatus(404);
  try {
    await posterRepo.softDelete(input.id);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const GetPoster = async (id) => {
  let PosterRepo = getRepository(Poster);
  let poster = await PosterRepo.findOne(id);
  if (!poster) return;
  return poster;
};
export const PosterService = {
  GetAll,
  Create,
  GetById,
  UpdateById,
  DeleteById,
  GetPoster,
};
//done
