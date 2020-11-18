import { NotificationService } from "../../CRUD/Poster/notification";

const seen = (req, res) => {
  let id = req.body.id || -1;
  let userId = res.locals.userId || -1;
  res.send(200);
  NotificationService.seen(userId, id);
  return;
};
const getAll = async (req, res) => {
  let userId = res.locals.userId;
  let skip = req.params.skip || 0;
  let take = req.params.take || 10;
  let result = await NotificationService.getAll(userId, take, skip);
  return res.send(result);
};
export const NotificationController = { seen, getAll };
