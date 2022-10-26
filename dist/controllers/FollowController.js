"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowDao_1 = require("../daos/FollowDao");
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
class FollowController {
    constructor() {
        /**
         * Users follows another user.
         * @param {Request} req Represents request from client, including the path
         * parameters 'follower' representing the user who wishes to follow a user and 'following' representing the user the follower user wishes to follow
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the new follows.
         */
        this.userFollowsUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const follower = req.params.follower;
            const following = req.params.following;
            const follows = yield FollowController.followDao.userFollowsUser(follower, following);
            res.json(follows);
        });
        /**
         * Users unfollows another user.
         * @param {Request} req Represents request from client, including the path
         * parameters 'follower' representing the user who wishes to follow a user and 'following' representing the user
         * the follower user wishes to follow
         * @param {Response} res Represents response to client, including the
         * body formatted as a JSON object of delete status.
         */
        this.userUnfollowsUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const follower = req.params.follower;
            const following = req.params.following;
            const followStatus = yield FollowController.followDao.userUnfollowsUser(follower, following);
            res.json(followStatus);
        });
        /**
         * Users who follow me.
         * @param {Request} req Represents request from client, including the path
         * parameters 'me' representing the user who and 'followers' representing the users following 'me'
         * @param {Response} res Represents response to client, including the
         * body formatted as a JSON array of users who follow them.
         */
        this.whoFollowsMe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const me = req.params.me;
            const followers = yield FollowController.followDao.whoFollowsMe(me);
            res.json(followers);
        });
        /**
         * Users I follow.
         * @param {Request} req Represents request from client, including the path
         * parameters 'me' representing the user and 'followers' representing the users 'me' is following
         * @param {Response} res Represents response to client, including the
         * body formatted as a JSON array of users who I follow.
         */
        this.whoDoIFollow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const me = req.params.me;
            const following = yield FollowController.followDao.whoDoIFollow(me);
            res.json(following);
        });
    }
}
exports.default = FollowController;
FollowController.followController = null;
FollowController.followDao = FollowDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return FollowController
 */
FollowController.getInstance = (app) => {
    if (FollowController.followController == null) {
        FollowController.followController = new FollowController();
        app.post("/api/users/:followerId/follows/:followerId", FollowController.followController.userFollowsUser);
        app.delete("/api/users/:userid/follows/:followerId", FollowController.followController.userUnfollowsUser);
        app.get("/api/users/:userid/follows", FollowController.followController.whoDoIFollow);
        app.get("/api/users/:userid/follows/followers", FollowController.followController.whoFollowsMe);
    }
    return FollowController.followController;
};
//# sourceMappingURL=FollowController.js.map