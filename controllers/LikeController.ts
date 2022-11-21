/**
 * @file LikeController RESTful web service API for like resource
 */
import {Request, Response, Express} from "express";
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";
import LikeControllerI from "../interfaces/LikeControllerI";
const session = require("express-session");


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
    private static tuitDao: TuitDao = TuitDao.getInstance();


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
            app.get("/api/users/:uid/dislikes", LikeController.likeController.findAllTuitsDislikedByUser);
            app.post("/api/users/:userid/likes/:tuitid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:userid/unlikes/:tuitid", LikeController.likeController.userUnlikesTuit);
            app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
            app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitDislikes);

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
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        LikeController.likeDao.findAllTuitsLiked(userId)
            .then(likes => {
                const likesNonNullTuits =
                    likes.filter(like => like.tuit);
                const tuitsFromLikes =
                    likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            });
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


    findAllTuitsDislikedByUser = (req, res) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        // Filter out null tuits and extract tuit object
        LikeController.likeDao.findAllTuitsDislikedByUser(userId)
            .then(dislikes => {
                const dislikesNonNullTuits =
                    dislikes.filter(dislike => dislike.tuit);
                const tuitsFromDislikes =
                    dislikesNonNullTuits.map(dislike => dislike.tuit);
                res.json(tuitsFromDislikes);
            });
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

    userTogglesTuitLikes = async (req, res) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedTuit = await LikeController.likeDao
                .findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.likeDao
                .countHowManyLikedTuit(tid);
            let tuit = await LikeController.tuitDao.findTuitById(tid);
            if (userAlreadyLikedTuit) {
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
            } else if (this.userAlreadyDislikedTuit) {
                const howManyDislikedTuit = await LikeController.likeDao.countHowManyDislikedTuit(tid);
                await LikeController.likeDao.updateLike(userId, tid, "LIKED");
                tuit.stats.likes = howManyLikedTuit + 1;
                tuit.stats.dislikes = howManyDislikedTuit - 1;
            } else {
                await LikeController.likeDao.userLikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
            };
            await LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
    private howManyDislikedTuit: number;
    private userAlreadyDislikedTuit: any;

    userTogglesTuitDislikes = async (req, res) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedTuit = await LikeController.likeDao
                .findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.likeDao
                .countHowManyLikedTuit(tid);
            let tuit = await LikeController.tuitDao.findTuitById(tid);
            if (userAlreadyLikedTuit) {
                const howManyLikedTuit = await LikeController.likeDao.countHowManyLikedTuit(tid);
                await LikeController.likeDao.updateLike(userId, tid, "DISLIKED");
                tuit.stats.likes = howManyLikedTuit - 1;
                tuit.stats.dislikes = this.howManyDislikedTuit + 1;
            }
            else if (this.userAlreadyDislikedTuit) {
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.dislikes = this.howManyDislikedTuit - 1;
            }
            if (userAlreadyLikedTuit) {
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
            } else {
                await LikeController.likeDao.userDislikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
            };
            await LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
};