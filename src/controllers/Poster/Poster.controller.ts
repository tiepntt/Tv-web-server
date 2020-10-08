import { Create, GetByIdDetails } from "../../CRUD/Poster/poster";
import { genBorn } from "../../libs/Book";
import { HandelStatus } from "../HandelAction";

module.exports.Create = async (req, res) => {
  console.log(req);

  var poster = {
    content: req.body.content,
    userCreateId: req.body.userCreateId,
    createTime: req.createTime ? new Date(genBorn(req.createTime)) : new Date(),
    urlAssets: req.file ? req.file.path : null,
  };
  console.log(poster);

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
