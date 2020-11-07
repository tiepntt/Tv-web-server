import { plainToClass } from "class-transformer";
import moment = require("moment");
import { RelationQueryBuilder } from "typeorm";
import { PosterService } from "../../CRUD/Poster/poster";
import { PosterInputDto, PosterUpdateDto } from "../../dto/poster/poster.dto";
import { HandelStatus } from "../HandelAction";

const Create = async (req, res) => {
  let body = req.body;
  let poster = plainToClass(PosterInputDto, body);
  poster.urlAssets = req.file ? req.file.path : undefined;
  poster.userCreateId = res.locals.userId || undefined;
  var result = await PosterService.Create(poster);
  res.send(result);
};
const GetById = async (req, res) => {
  var postId = req.params.id;
  if (!postId) {
    res.send(HandelStatus(204));
    return;
  }

  var result = await PosterService.GetById(postId);
  res.json(result);
};
const getAll = async (req, res) => {
  let take = req.params.take || 10;
  let skip = req.params.skip || 0;
  var result = await PosterService.GetAll(take, skip);
  res.send(result);
};
const update = async (req, res) => {
  let body = req.body;
  let poster = plainToClass(PosterUpdateDto, body, {
    excludeExtraneousValues: true,
  });
  poster.userCreateId = res.locals.userId;
  poster.urlAssets = req.file ? req.file.path : poster.urlAssets || " ";
  var result = await PosterService.UpdateById(poster);
  res.send(result);
};
const removeById = async (req, res) => {
  var input = req.params.id;
  let poster = new PosterUpdateDto();
  poster.id = input;
  poster.userCreateId = res.locals.userId;

  var result = await PosterService.DeleteById(poster);
  return res.send(result);
};
export const PosterController = { Create, GetById, getAll, update, removeById };
