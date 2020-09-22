import { Create } from "../../CRUD/Book/book";
import { HandelStatus } from "../HandelAction"

module.exports.Create = async (req, res) => {
    if (!req.body.book) {
        res.send(HandelStatus(404));
        return;
    }
    let result = await Create(req.body.book);
    res.send(result);

}