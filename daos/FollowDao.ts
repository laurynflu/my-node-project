import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowController from "../controllers/FollowController";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    userFollowsUser = async (follower: string, following: string): Promise<Follow> =>
        FollowModel.create({follower, following});

    userUnfollowsUser = async (follower: string, following: string): Promise<any> =>
        FollowModel.deleteOne({follower, following});

    whoFollowsMe = async (followingMe: string): Promise<Follow[]> =>
        FollowModel.find({following: followingMe}).populate("follower").exec();

    whoDoIFollow = async (iFollow: string): Promise<Follow[]> =>
        FollowModel.find({follower: iFollow}).populate("following").exec();

    findUserIAmFollowing = async (me: string, user: string): Promise<any> =>
        FollowModel.findOne({follower: me, following: user}).populate("following").exec();

    findUserFollowingMe = async (user: string, me: string): Promise<any> =>
        FollowModel.findOne({follower: user, following: me}).populate("follower").exec();
}