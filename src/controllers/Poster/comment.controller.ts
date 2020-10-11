
import { Create, Delete, GetById, Update } from "../../CRUD/Poster/comment";
import { HandelStatus } from "../HandelAction"

export const create = async (req, res) => {
    if(
        !req.body.posterId || !res.locals.userId|| !(req.body.content && req.file)) {
        res.send(HandelStatus(204));
        return;
    }
    var comment = {
        content : req.body.content,
        asset : req.file.path,
        userId : res.locals.userId,
        createTime : new Date(''),
        posterId : req.body.posterId
    }
    let result = await Create(comment);
    res.send(result)
}
export const updateComment = async ( req, res ) =>
{
    if(
        !req.body.posterId || !res.locals.userId || !(req.body.content && req.file) || !req.body.id) {
        res.send(HandelStatus(204));
        return;
    }
    var comment = {
        id: req.body.Id,
        content : req.body.content,
        asset: req.file.path,
        userId : res.locals.userId || -1
    }
    let result = await Update(comment);
    res.send(result)
}
export const deleteComment = async ( req, res ) =>
{
    var idComment = req.params.id;
    var result = await Delete( {id : idComment, userId : res.locals.userId} );
    res.send( result );
}
export const getById = async ( req, res ) =>
{
    let id = req.params.id;
    var result = await GetById( id );
    res.send( result );
}