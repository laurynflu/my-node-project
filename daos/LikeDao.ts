/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";
import LikeDaoI from "../interfaces/LikeDaoI";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Use LikeModel to find all tuits liked by user
     * @param {string} userid id of the user that liked tuits
     * @returns Promise To be notified when the likes are retrieved from database
     */
    findAllTuitsLiked = async (userid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: userid, type: "LIKED"})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Use LikeModel to find all users that liked the tuit
     * @param {string} tuitid id of the tuit that was liked by users
     * @returns Promise To be notified when the likes are retrieved from database
     */
    findAllUsersThatLikedTuit = async (tuitid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tuitid, type: "LIKED"})
            .populate("likedBy")
            .exec();


    /**
     * Use LikeModel to find all users that disliked the tuit
     * @param {string} userid id of the user that tuits were liked from
     * @returns Promise To be notified when the tuits are retrieved from database
     */
    findAllTuitsDislikedByUser = async (userid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: userid, type: "DISLIKED"})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * User likes a tuit
     * @param {string} userid id of the user that liked the tuit
     * @param {string} tuitid id of the tuit that was liked by user
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit= async (userid: string, tuitid: string): Promise<any> =>
        LikeModel.create({tuit: tuitid, likedBy: userid, type: "LIKED"});

    /**
     * User unlikes a tuit
     * @param {string} userid id of the user that unliked the tuit
     * @param {string} tuitid id of the tuit that was unliked by user
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit = async (userid: string, tuitid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tuitid, likedBy: userid});

    /**
     * Find user that likes a tuit
     * @param {string} userid id of the user that unliked the tuit
     * @param {string} tuitid id of the tuit that was unliked by user
     * @returns Promise To be notified when like is removed from the database
     */
    findUserLikesTuit = async (userid: string, tuitid: string): Promise<Like> =>
        LikeModel.findOne({tuit: tuitid, likedBy: userid, type: "LIKED"});

    /**
     * Find user that dislikes a tuit
     * @param {string} userid id of the user that disliked the tuit
     * @param {string} tuitid id of the tuit that was disliked by user
     * @returns Promise To be notified when like is removed from the database
     */
    findUserDislikesTuit = async (userid: string, tuitid: string): Promise<Like> =>
        LikeModel.findOne({tuit: tuitid, likeBy: userid, type: "DISLIKED"});


    /**
     * Count of how many liked tuits there are
     * @param {string} tuitid id of the tuit that was disliked by user
     */
    countHowManyLikedTuit = async (tuitid) =>
        LikeModel.count({tuit: tuitid, type: "LIKED"});

    /**
     * Count of how many disliked tuits there are
     * @param {string} tuitid id of the tuit that was disliked by user
     */
    countHowManyDislikedTuit = async (tuitid) =>
        LikeModel.count({tuit: tuitid, type: "DISLIKE"});


    /**
     * User dislikes a tuit
     * @param {string} userid id of the user that disliked the tuit
     * @param {string} tuitid id of the tuit that was disliked by user
     * @returns Promise To be notified when disliked is inserted into the database
     */
    userDislikesTuit = async (userid: string, tuitid: string): Promise<any> =>
        LikeModel.create({tuit: tuitid, likedBy: userid, type: "DISLIKED"});

    /**
     * Update likes
     * @param {string} userid id of the user that disliked the tuit
     * @param {string} tuitid id of the tuit that was disliked by user
     * @returns Promise To be notified when likes are is inserted into the database
     */
    updateLike = async (userid: string, tuitid: string, type: string): Promise<any> => {
        return LikeModel.updateOne(
            {tuit: tuitid, likedBy: userid},
            {$set: {type}})
    }

}