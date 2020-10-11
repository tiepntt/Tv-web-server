import moment = require("moment");
import { Create, DeleteById, GetAll, GetByIdDetails, UpdateById } from "../../CRUD/Poster/poster";
import { genBorn } from "../../libs/Book";
import { HandelStatus } from "../HandelAction";

module.exports.Create = async (req, res) => {
  // console.log(req);

  var poster = {
    content: req.body.content,
    userCreateId: res.locals.userId,
    createTime: req.createTime ? new Date(genBorn(req.createTime)) : new Date(),
    urlAssets: req.file ? req.file.path : null,
  };
  var result = await Create(poster);
  res.send(result);
};
module.exports.GetById = async (req, res) => {
  var postId = req.params.id;
  if (!postId) {
    res.send(HandelStatus(204));
    return;
  }

  
  var result = await GetByIdDetails(postId);
  res.json(result);
}
export const getAll = async (req, res) => {
  var result = await GetAll();
  res.send(result);
}
export const update = async ( req, res ) =>
{
  var poster = {
    id: req.body.PosterId,
    content: req.body.content,
    urlAssets: req.file ? req.file.path : null,
    userCreateId : res.locals.userId || -1
  };
  var result = await UpdateById(poster);
  res.send(result);
}
export const removeById = async ( req, res ) =>
{
  var id = req.params.id;
  var result = await DeleteById( {id : id, userCreateId : res.locals.userId || -1} );
  return result;
}
