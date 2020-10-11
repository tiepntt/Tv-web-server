


import { Create } from "../../CRUD/Poster/likePoster";
import { HandelStatus } from "../HandelAction"

export const createLike = async (req, res) => {
    let likeConfig = req.body.likeConfig;
    if(
        !likeConfig ) {
        res.send(HandelStatus(204));
        return;
    }
    var comment = {
        userId : res.locals.userId,
        createTime : new Date(),
        posterId : likeConfig.posterId
    }
    let result = await Create(comment);
    res.send(result)
}
// export const deleteLike = async ( req, res ) =>
// {
//     var poster = req.body.poster;
//     if ( !poster || !poster.posterId || !poster.userId )
//     {
//         res.send(HandelStatus(204))
//     }
// }