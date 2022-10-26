/**
 * @file LikeController RESTful web service API for like resource
 */
import {Request, Response, Express} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeControllerI";

/**
 * @class LikeController Implements RESTful Web service API for like resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:userid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tuitid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:userid/likes/:tuitid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:userid/unlikes/:tuitid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} likeController Singleton controller implementing LikeControllerI
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
    private static likeController: LikeController | null = null;
    private static likeDao: LikeDao = LikeDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return LikeController
     */
    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController == null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:userid/likes", LikeController.likeController.findAllTuitsLiked);
            app.get("/api/tuits/:tuitid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
            app.post("/api/users/:userid/likes/:tuitid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:userid/unlikes/:tuitid", LikeController.likeController.userUnlikesTuit);
        }
        return LikeController.likeController;
    }
    private constructor() {}

    /**
     * Tuits liked by a user
     * @param {Request} req Represents request from client, including the path
     * parameter 'userid' representing the user that liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the liked tuit objects
     */
    findAllTuitsLiked = (req: Request, res: Response) => {
        LikeController.likeDao.findAllTuitsLiked(req.params.userid)
            .then(likes => res.json(likes));
    }

    /**
     * All users that liked a tuit
     * @param {Request} req Represents request from client, including the path
     * parameter 'tuitid' representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user that liked the tuit
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) => {
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tuitid)
            .then(likes => res.json(likes));
    }

    /**
     * User likes a tuit
     * @param {Request} req Represents request from client, including the
     * path parameters 'userid' representing the user that liked the tuit and 'tuitid' representing the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing a new like
     */
    userLikesTuit = (req: Request, res: Response) => {
        LikeController.likeDao.userLikesTuit(req.params.userid, req.params.tuitid)
            .then(likes => res.json(likes));
    }

    /**
     * User unlikes a tuit
     * @param {Request} req Represents request from client, including the
     * path parameters 'userid' representing the user that unliked the tuit and 'tuitid' representing the tuit being unliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON delete status object
     */
    userUnlikesTuit = (req: Request, res: Response) => {
        LikeController.likeDao.userUnlikesTuit(req.params.userid, req.params.tuitid)
            .then(likeStatus => res.json(likeStatus));
    }

}