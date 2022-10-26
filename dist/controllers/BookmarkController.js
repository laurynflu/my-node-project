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
const BookmarkDao_1 = require("../daos/BookmarkDao");
/**
 * @class BookmarkController Implements RESTful Web service API for bookmark resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:userid/bookmarks/:tuitid to bookmark a tuit.
 *     </li>
 *     <li>DELETE /api/users/:userid/bookmarks/:tuitid to unbookmark a tuit.
 *     </li>
 *     <li>GET /api/users/:userid/bookmarks to fetch all the tuits bookmarked by a user.
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing likes CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing BookmarkControllerI
 * RESTful Web service API
 */
class BookmarkController {
    constructor() {
        /**
         * Bookmark a tuit.
         * @param {Request} req Represents request from client, including the path
         * parameters 'userid' representing the user who wishes to bookmark a tuit and 'tuitid' representing the id of the tuit.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the bookmarked tuit.
         */
        this.userBookmarksTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userid = req.params.userid;
            const tuitid = req.params.tuidid;
            const bookmark = yield BookmarkController.bookmarkDao.userBookmarksTuit(userid, tuitid);
            res.json(bookmark);
        });
        /**
         * Unbookmark a tuit.
         * @param {Request} req Represents request from client, including the path
         * parameters 'userid' representing the user who wishes to unbookmark a tuit and 'tuitid' representing the id of the tuit.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the bookmarked tuit.
         */
        this.userUnbookmarksTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userid = req.params.userid;
            const tuitid = req.params.tuidid;
            const bookmarkStatus = yield BookmarkController.bookmarkDao.userUnbookmarksTuit(userid, tuitid);
            res.json(bookmarkStatus);
        });
        /**
         * Find all bookmarked tuits.
         * @param {Request} req Represents request from client, including the path
         * parameters 'userid' representing the user who wishes view their bookmarked tuits and 'tuitid' representing the array of ids of the tuit.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of bookmarked tuits.
         */
        this.findAllBookmarkedTuits = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userid = req.params.userid;
            const bookmarkTuit = yield BookmarkController.bookmarkDao.findAllBookmarkedTuits(userid);
            res.json(bookmarkTuit);
        });
        /**
         * Find all users that bookmarked a tuit.
         * @param {Request} req Represents request from client, including the path
         * parameters 'userid' representing the user who wishes to view the users who liked bookmarked their tuit and 'tuitid' representing the id of the tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of users who bookmarked the tuit.
         */
        this.findAllUsersThatBookmarkedTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tuitid = req.params.tuidid;
            const users = yield BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(tuitid);
            res.json(users);
        });
    }
}
exports.default = BookmarkController;
BookmarkController.bookmarkController = null;
BookmarkController.bookmarkDao = BookmarkDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return BookmarkController
 */
BookmarkController.getInstance = (app) => {
    if (BookmarkController.bookmarkController == null) {
        BookmarkController.bookmarkController = new BookmarkController();
        app.post('/api/users/:userid/bookmarks/:tuitid', BookmarkController.bookmarkController.userBookmarksTuit);
        app.delete('/api/users/:userid/bookmarks/:tuitid', BookmarkController.bookmarkController.userUnbookmarksTuit);
        app.get('/api/users/:userid/bookmarks', BookmarkController.bookmarkController.findAllBookmarkedTuits);
        app.get('/api/tuits/:tuitid/bookmarks', BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
    }
    return BookmarkController.bookmarkController;
};
//# sourceMappingURL=BookmarkController.js.map