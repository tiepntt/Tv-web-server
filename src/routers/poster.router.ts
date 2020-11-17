import { CommentController } from "../controllers/Poster/comment.controller";
import { createLike } from "../controllers/Poster/like.controller";
import { NotificationController } from "../controllers/Poster/notification.controller";
import { PosterController } from "../controllers/Poster/Poster.controller";
import { uploadMulter } from "../upload/cloudinary";

let express = require("express");
let router = express.Router();

//post
router.get("/skip=:skip&&take=:take", PosterController.getAll);
router.post("/create", uploadMulter.single("photo"), PosterController.Create);
router.get("/:id", PosterController.GetById);
router.put("/update", uploadMulter.single("photo"), PosterController.update);
router.delete("/:id", PosterController.removeById);

//comment
router.post("/comment", uploadMulter.single("photo"), CommentController.create);
router.get("/comment/:id", CommentController.getById);
router.put(
  "/comment",
  uploadMulter.single("photo"),
  CommentController.updateComment
);
router.delete("/comment/:id", CommentController.deleteComment);
//like
router.post("/like", createLike);
router.post("/seenNotification", NotificationController.seen);
router.get(
  "/notifications/skip=:skip&take=:take",
  NotificationController.getAll
);
module.exports = router;
