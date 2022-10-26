"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LikeDao_1 = require("../daos/LikeDao");
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
class LikeController {
    constructor() {
        /**
         * Tuits liked by a user
         * @param {Request} req Represents request from client, including the path
         * parameter 'userid' representing the user that liked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the liked tuit objects
         */
        this.findAllTuitsLiked = (req, res) => {
            LikeController.likeDao.findAllTuitsLiked(req.params.userid)
                .then(likes => res.json(likes));
        };
        /**
         * All users that liked a tuit
         * @param {Request} req Represents request from client, including the path
         * parameter 'tuitid' representing the liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user that liked the tuit
         */
        this.findAllUsersThatLikedTuit = (req, res) => {
            LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tuitid)
                .then(likes => res.json(likes));
        };
        /**
         * User likes a tuit
         * @param {Request} req Represents request from client, including the
         * path parameters 'userid' representing the user that liked the tuit and 'tuitid' representing the tuit being liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing a new like
         */
        this.userLikesTuit = (req, res) => {
            LikeController.likeDao.userLikesTuit(req.params.userid, req.params.tuitid)
                .then(likes => res.json(likes));
        };
        /**
         * User unlikes a tuit
         * @param {Request} req Represents request from client, including the
         * path parameters 'userid' representing the user that unliked the tuit and 'tuitid' representing the tuit being unliked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON delete status object
         */
        this.userUnlikesTuit = (req, res) => {
            LikeController.likeDao.userUnlikesTuit(req.params.userid, req.params.tuitid)
                .then(likeStatus => res.json(likeStatus));
        };
    }
}
exports.default = LikeController;
LikeController.likeController = null;
LikeController.likeDao = LikeDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return LikeController
 */
LikeController.getInstance = (app) => {
    if (LikeController.likeController == null) {
        LikeController.likeController = new LikeController();
        app.get("/api/users/:userid/likes", LikeController.likeController.findAllTuitsLiked);
        app.get("/api/tuits/:tuitid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
        app.post("/api/users/:userid/likes/:tuitid", LikeController.likeController.userLikesTuit);
        app.delete("/api/users/:userid/unlikes/:tuitid", LikeController.likeController.userUnlikesTuit);
    }
    return LikeController.likeController;
};
//# sourceMappingURL=LikeController.js.map