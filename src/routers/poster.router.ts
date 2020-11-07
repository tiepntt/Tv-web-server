import { CommentController } from "../controllers/Poster/comment.controller";
import { createLike } from "../controllers/Poster/like.controller";
import { PosterController } from "../controllers/Poster/Poster.controller";
import { uploadMulter } from "../upload/cloudinary";

var express = require("express");
var router = express.Router();

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
module.exports = router;
