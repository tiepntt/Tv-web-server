import { plainToClass } from "class-transformer";
import { Create } from "../../CRUD/Poster/likePoster";
import { LikeInputDto } from "../../dto/poster/like.dto";
import { HandelStatus } from "../HandelAction";

export const createLike = async (req, res) => {
  let likeConfig = req.body.like;
  let like = plainToClass(LikeInputDto, likeConfig, {
    excludeExtraneousValues: true,
  });
  like.userId = res.locals.userId;
  let result = await Create(like);
  res.send(result);
};
