import { Create } from "../../CRUD/Poster/poster";
import { genBorn } from "../../libs/Book";

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
