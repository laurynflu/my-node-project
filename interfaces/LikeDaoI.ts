import Like from "../models/Like";

export default interface LikeDaoI {
    findAllTuitsLiked (userid: string): Promise<Like[]>;
    findAllUsersThatLikedTuit (tuitid: string): Promise<Like[]>;
    userLikesTuit (userid: string, tuitid: string): Promise<any>;
    userUnlikesTuit (userid: string, tuitid: string): Promise<any>;
}