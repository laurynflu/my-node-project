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
const BookmarkModel_1 = require("../mongoose/BookmarkModel");
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
class BookmarkDao {
    constructor() {
        /**
         * Inserts bookmark instance into the database
         * @param {string} userid id of the user that bookmarked the tuit
         * @param {string} tuitid id of the tuit that was bookmarked by user
         * @returns Promise To be notified when bookmark is inserted into the database
         */
        this.userBookmarksTuit = (userid, tuitid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.create({ user: userid, tuit: tuitid }); });
        /**
         * Removes bookmark
         * @param {string} userid id of the user that unbookmarked the tuit
         * @param {string} tuitid id of the tuit that was unbookmarked by user
         * @returns Promise To be notified when bookmark is removed from the database
         */
        this.userUnbookmarksTuit = (userid, tuitid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteOne({ user: userid, tuit: tuitid }); });
        /**
         * Retrieve all bookmark documents using the BookmarkModel
         * @param {string} userid id of the user that bookmarked tuits
         * @returns Promise To be notified when the bookmarks are retrieved from database
         */
        this.findAllBookmarkedTuits = (userid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.find({ user: userid }).populate("tuit").exec(); });
        /**
         * Retrieve all users that bookmarked tuits using the BookmarkModel
         * @param {string} tuitid id of the tuit that users bookmarked
         * @returns Promise To be notified when bookmarks are retrieved from database
         */
        this.findAllUsersThatBookmarkedTuit = (tuitid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.find({ tuit: tuitid }).populate("user").exec(); });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
 * Creates singleton DAO instance
 * @returns BookmarkDao
 */
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
//# sourceMappingURL=BookmarkDao.js.map