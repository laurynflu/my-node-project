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
const FollowModel_1 = require("../mongoose/FollowModel");
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
class FollowDao {
    constructor() {
        /**
         * User follows user
         * @param {string} follower id of the user that is the follower
         * @param {string} following id of the user that the follower is following
         * @returns Promise To be notified when the follow is inserted into the database
         */
        this.userFollowsUser = (follower, following) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ follower, following }); });
        /**
         * User unfollows user
         * @param {string} follower id of the user that is unfollowing another user
         * @param {string} following id of the user that the follower is unfollowing
         * @returns Promise To be notified when follow is removed from the database
         */
        this.userUnfollowsUser = (follower, following) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ follower, following }); });
        /**
         * Use FollowModel to find users are following me
         * @param {string} followingMe id of the user that is being followed
         * @returns Promise To be notified when follows are retrieved from database
         */
        this.whoFollowsMe = (followingMe) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.find({ following: followingMe }).populate("follower").exec(); });
        /**
         * Use FollowModel to find what users I follow
         * @param {string} iFollow Primary key of the user that is the follower
         * @returns Promise To be notified when follows are retrieved from database
         */
        this.whoDoIFollow = (iFollow) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.find({ follower: iFollow }).populate("following").exec(); });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * Creates singleton DAO instance
 * @returns FollowDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
//# sourceMappingURL=FollowDao.js.map