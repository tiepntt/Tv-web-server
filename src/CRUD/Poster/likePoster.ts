import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { LikeInputDto } from "../../dto/poster/like.dto";
import { NotificationInput } from "../../dto/poster/notification.dto";
import { Like, LikeConfig } from "../../entity/Poster/Like";
import { Poster } from "../../entity/Poster/Poster";
import { User } from "../../entity/User/User";
import { NotificationService } from "./notification";

export const Create = async (likeConfig: LikeInputDto) => {
  if (!likeConfig.posterId || !likeConfig.userId) return HandelStatus(400);
  let likeRepo = getRepository(Like);
  let userRepo = getRepository(User);
  let posterRepo = getRepository(Poster);
  let user = await userRepo.findOne(likeConfig.userId);
  let poster = await posterRepo.findOne({
    relations: ["userCreate"],
    where: { id: likeConfig.posterId },
  });
  if (!user || !poster) return HandelStatus(204);
  let likeGet = await likeRepo.findOne({ user: user, poster: poster });
  if (likeGet) {
    try {
      await likeRepo.remove(likeGet);
      return HandelStatus(200, "Đã xóa");
    } catch (e) {
      return HandelStatus(500);
    }
  } else {
    let like = new Like();
    like.poster = poster;
    like.user = user;
    try {
      await likeRepo.save(like);
      let notification = new NotificationInput();
      notification.userCreate = user;
      notification.context = "Confirm";
      notification.userSubscribe = [poster.userCreate].filter(
        (o) => o.id != user.id
      );
      NotificationService.create(notification);
      return HandelStatus(200, "Ok");
    } catch (e) {
      return HandelStatus(500);
    }
  }
};
