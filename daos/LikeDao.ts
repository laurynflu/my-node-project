import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";
import LikeDaoI from "../interfaces/LikeDaoI";

export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    findAllTuitsLiked = async (userid: string): Promise<Like[]> =>
        LikeModel.find({likedBy: userid}).populate("tuit").exec();

    findAllUsersThatLikedTuit = async (tuitid: string): Promise<Like[]> =>
        LikeModel.find({tuit: tuitid}).populate("likedBy").exec();

    userLikesTuit= async (userid: string, tuitid: string): Promise<any> =>
        LikeModel.create({tuit: tuitid, likedBy:userid});

    userUnlikesTuit = async (userid: string, tuitid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tuitid, likedBy:userid});
}