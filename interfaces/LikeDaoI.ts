import Like from "../models/Like";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDaoI {
    findAllTuitsLiked (userid: string): Promise<Like[]>;
    findAllUsersThatLikedTuit (tuitid: string): Promise<Like[]>;
    userLikesTuit (userid: string, tuitid: string): Promise<any>;
    userUnlikesTuit (userid: string, tuitid: string): Promise<any>;
}