import { create, deleteComment, getById, updateComment } from "../controllers/Poster/comment.controller";
import { createLike } from "../controllers/Poster/like.controller";
import { getAll, removeById, update } from "../controllers/Poster/Poster.controller";
import { uploadMulter } from "../upload/cloudinary";


var express = require("express");
var router = express.Router();
var PosterController = require("../controllers/Poster/Poster.controller");

//post
router.get("/", getAll )
router.post("/create", uploadMulter.single("photo"), PosterController.Create);
router.get( "/:id", PosterController.GetById )
router.put("/update", update)
router.delete( "/:id",removeById )

//comment
router.post( "/comment", uploadMulter.single( "photo" ), create )
router.get( "/comment/:id", getById )
router.put( "/comment", updateComment )
router.delete("/comment/:id", deleteComment)
//like
router.post("/like",createLike )
module.exports = router;
