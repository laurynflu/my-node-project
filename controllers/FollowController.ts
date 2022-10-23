import {Request, Response, Express} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

export default class FollowController implements FollowControllerI {
    private static followController: FollowController | null = null;
    private static followDao: FollowDao = FollowDao.getInstance();

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController == null) {
            FollowController.followController = new FollowController();
            app.get('/api/users', FollowController.followController.userFollowsUser);
            app.get('/api/users/:userid', FollowController.followController.userUnfollowsUser);
            app.post('/api/users', FollowController.followController.whoFollowsMe);
            app.post('/api/users', FollowController.followController.whoDoIFollow);
            app.post('/api/users', FollowController.followController.findUserIAmFollowing);
            app.post('/api/users', FollowController.followController.findUserFollowingMe);
        }
        return FollowController.followController;
    }
    private constructor() {}

    userFollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const following = req.params.following;
        const follows = await FollowController.followDao.userFollowsUser(follower, following);
        res.json(follows);
    }

    userUnfollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const following = req.params.following;
        const followStatus = await FollowController.followDao.userUnfollowsUser(follower, following);
        res.json(followStatus);
    }

    whoFollowsMe = async (req: Request, res: Response) => {
        const me = req.params.me;
        const followers = await FollowController.followDao.whoFollowsMe(me);
        res.json(followers);
    }

    whoDoIFollow = async (req: Request, res: Response) => {
        const me = req.params.me;
        const following = await FollowController.followDao.whoDoIFollow(me);
        res.json(following);
    }

    findUserIAmFollowing = async (req: Request, res: Response) => {
        const me = req.params.me;
        const user = req.params.user;
        const following = await FollowController.followDao.findUserIAmFollowing(me, user);
        res.json(following);
    }

    findUserFollowingMe = async (req: Request, res: Response) => {
        const me = req.params.me;
        const user = req.params.user;
        const following = await FollowController.followDao.findUserFollowingMe(user, me);
        res.json(following);
    }

}