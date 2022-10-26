/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";
import FollowDaoI from "../interfaces/FollowDaoI";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    /**
     * User follows user
     * @param {string} follower id of the user that is the follower
     * @param {string} following id of the user that the follower is following
     * @returns Promise To be notified when the follow is inserted into the database
     */
    userFollowsUser = async (follower: string, following: string): Promise<Follow> =>
        FollowModel.create({follower, following});

    /**
     * User unfollows user
     * @param {string} follower id of the user that is unfollowing another user
     * @param {string} following id of the user that the follower is unfollowing
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowsUser = async (follower: string, following: string): Promise<any> =>
        FollowModel.deleteOne({follower, following});

    /**
     * Use FollowModel to find users are following me
     * @param {string} followingMe id of the user that is being followed
     * @returns Promise To be notified when follows are retrieved from database
     */
    whoFollowsMe = async (followingMe: string): Promise<Follow[]> =>
        FollowModel.find({following: followingMe}).populate("follower").exec();

    /**
     * Use FollowModel to find what users I follow
     * @param {string} iFollow Primary key of the user that is the follower
     * @returns Promise To be notified when follows are retrieved from database
     */
    whoDoIFollow = async (iFollow: string): Promise<Follow[]> =>
        FollowModel.find({follower: iFollow}).populate("following").exec();
}