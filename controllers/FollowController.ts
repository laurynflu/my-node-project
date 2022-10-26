/**
 * @file FollowController RESTful web service API for follower resource
 */
import {Request, Response, Express} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follow resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:followerId/follows/:followedId to follow a user.
 *     </li>
 *     <li>DELETE /api/users/:userid/follows/:followedId to unfollow a user.
 *     </li>
 *     <li>GET /api/users/:userid/follows to retrieve all users that a user follows.
 *     </li>
 *     <li>GET /api/users/:userid/follows/followers to retrieve all the followers of a user.
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} followController Singleton controller implementing FollowControllerI
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followController: FollowController | null = null;
    private static followDao: FollowDao = FollowDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController == null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:followerId/follows/:followerId", FollowController.followController.userFollowsUser)
            app.delete("/api/users/:userid/follows/:followerId", FollowController.followController.userUnfollowsUser)
            app.get("/api/users/:userid/follows", FollowController.followController.whoDoIFollow)
            app.get("/api/users/:userid/follows/followers", FollowController.followController.whoFollowsMe)
        }
        return FollowController.followController;
    }
    private constructor() {}

    /**
     * Users follows another user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'follower' representing the user who wishes to follow a user and 'following' representing the user the follower user wishes to follow
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the new follows.
     */
    userFollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const following = req.params.following;
        const follows = await FollowController.followDao.userFollowsUser(follower, following);
        res.json(follows);
    }

    /**
     * Users unfollows another user.
     * @param {Request} req Represents request from client, including the path
     * parameters 'follower' representing the user who wishes to follow a user and 'following' representing the user
     * the follower user wishes to follow
     * @param {Response} res Represents response to client, including the
     * body formatted as a JSON object of delete status.
     */
    userUnfollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const following = req.params.following;
        const followStatus = await FollowController.followDao.userUnfollowsUser(follower, following);
        res.json(followStatus);
    }

    /**
     * Users who follow me.
     * @param {Request} req Represents request from client, including the path
     * parameters 'me' representing the user who and 'followers' representing the users following 'me'
     * @param {Response} res Represents response to client, including the
     * body formatted as a JSON array of users who follow them.
     */
    whoFollowsMe = async (req: Request, res: Response) => {
        const me = req.params.me;
        const followers = await FollowController.followDao.whoFollowsMe(me);
        res.json(followers);
    }

    /**
     * Users I follow.
     * @param {Request} req Represents request from client, including the path
     * parameters 'me' representing the user and 'followers' representing the users 'me' is following
     * @param {Response} res Represents response to client, including the
     * body formatted as a JSON array of users who I follow.
     */
    whoDoIFollow = async (req: Request, res: Response) => {
        const me = req.params.me;
        const following = await FollowController.followDao.whoDoIFollow(me);
        res.json(following);
    }

}