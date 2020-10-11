import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { Like, LikeConfig } from "../../entity/Poster/Like";
import { Poster } from "../../entity/Poster/Poster";
import { User } from "../../entity/User/User";

export const Create = async (likeConfig: LikeConfig) => { 
    if (!likeConfig.posterId || !likeConfig.userId) return HandelStatus(200);
    let likeRepo = getRepository(Like);
    let userRepo = getRepository(User);
    let posterRepo = getRepository(Poster);
    let user = await userRepo.findOne(likeConfig.userId);
    let poster = await posterRepo.findOne( likeConfig.posterId );
    if (!user || !poster) return HandelStatus(204);
    let likeGet = await likeRepo.findOne( { user: user, poster: poster } );
    if ( likeGet )
    {
        await likeRepo.delete( likeGet );
        return HandelStatus( 200, "Đã xóa" );
    }
    else{
        let like = new Like();
        like.poster = poster;
        like.user = user;
        like.createTime = likeConfig.createTime || new Date();
        await likeRepo.save(like);
        return HandelStatus( 200 );
    }
    
}
