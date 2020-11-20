import { plainToClass } from "class-transformer";
import { io } from "../..";
import { CommentService } from "../../CRUD/Poster/comment";
import { CommentInputDto } from "../../dto/poster/comment.dto";
import { HandelStatus } from "../HandelAction";

const create = async (req, res) => {
  let commentInput = req.body;
  let comment = plainToClass(CommentInputDto, commentInput, {
    excludeExtraneousValues: true,
  });
  comment.userId = res.locals.userId;
  comment.asset = req.file ? req.file.path : undefined;
  let result = await CommentService.Create(comment);
  res.send(result);
  
};
const updateComment = async (req, res) => {
  let commentInput = req.body;
  let comment = plainToClass(CommentInputDto, commentInput, {
    excludeExtraneousValues: true,
  });
  comment.userId = res.locals.userId;
  comment.asset = req.file ? req.file.path : " ";

  let result = await CommentService.Update(comment);
  res.send(result);
};
const deleteComment = async (req, res) => {
  let commentInput = req.params.id;
  let comment = new CommentInputDto();
  comment.userId = res.locals.userId;
  comment.id = commentInput;
  let result = await CommentService.Delete(comment);
  res.send(result);
};
const getById = async (req, res) => {
  let id = req.params.id;
  let result = await CommentService.GetById(id);
  res.send(result);
};
export const CommentController = {
  create,
  updateComment,
  deleteComment,
  getById,
};
