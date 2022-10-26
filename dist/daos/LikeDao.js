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
const LikeModel_1 = require("../mongoose/LikeModel");
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
class LikeDao {
    constructor() {
        /**
         * Use LikeModel to find all tuits liked by user
         * @param {string} userid id of the user that liked tuits
         * @returns Promise To be notified when the likes are retrieved from database
         */
        this.findAllTuitsLiked = (userid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.find({ likedBy: userid }).populate("tuit").exec(); });
        /**
         * Use LikeModel to find all users that liked the tuit
         * @param {string} tuitid id of the tuit that was liked by users
         * @returns Promise To be notified when the likes are retrieved from database
         */
        this.findAllUsersThatLikedTuit = (tuitid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.find({ tuit: tuitid }).populate("likedBy").exec(); });
        /**
         * User likes a tuit
         * @param {string} userid id of the user that liked the tuit
         * @param {string} tuitid id of the tuit that was liked by user
         * @returns Promise To be notified when like is inserted into the database
         */
        this.userLikesTuit = (userid, tuitid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.create({ tuit: tuitid, likedBy: userid }); });
        /**
         * User unlikes a tuit
         * @param {string} userid id of the user that unliked the tuit
         * @param {string} tuitid id of the tuit that was unliked by user
         * @returns Promise To be notified when like is removed from the database
         */
        this.userUnlikesTuit = (userid, tuitid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.deleteOne({ tuit: tuitid, likedBy: userid }); });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
/**
 * Creates singleton DAO instance
 * @returns LikeDao
 */
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
//# sourceMappingURL=LikeDao.js.map