/**
 * @file BookmarkController RESTful web service API for bookmarks resource
 */
import {Request, Response, Express} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

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
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkController: BookmarkController | null = null;
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController == null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post('/api/users/:userid/bookmarks/:tuitid', BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete('/api/users/:userid/bookmarks/:tuitid', BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get('/api/users/:userid/bookmarks', BookmarkController.bookmarkController.findAllBookmarkedTuits);
            app.get('/api/tuits/:tuitid/bookmarks', BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
        }
        return BookmarkController.bookmarkController;
    }
    private constructor() {}

    /**
     * Bookmark a tuit.
     * @param {Request} req Represents request from client, including the path
     * parameters 'userid' representing the user who wishes to bookmark a tuit and 'tuitid' representing the id of the tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the bookmarked tuit.
     */
    userBookmarksTuit = async (req: Request, res: Response) => {
        const userid = req.params.userid;
        const tuitid = req.params.tuidid;
        const bookmark = await BookmarkController.bookmarkDao.userBookmarksTuit(userid, tuitid);
        res.json(bookmark);
    }

    /**
     * Unbookmark a tuit.
     * @param {Request} req Represents request from client, including the path
     * parameters 'userid' representing the user who wishes to unbookmark a tuit and 'tuitid' representing the id of the tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object of the bookmarked tuit.
     */
    userUnbookmarksTuit = async (req: Request, res: Response) => {
        const userid = req.params.userid;
        const tuitid = req.params.tuidid;
        const bookmarkStatus = await BookmarkController.bookmarkDao.userUnbookmarksTuit(userid, tuitid);
        res.json(bookmarkStatus);
    }

    /**
     * Find all bookmarked tuits.
     * @param {Request} req Represents request from client, including the path
     * parameters 'userid' representing the user who wishes view their bookmarked tuits and 'tuitid' representing the array of ids of the tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of bookmarked tuits.
     */
    findAllBookmarkedTuits = async (req: Request, res: Response) => {
        const userid = req.params.userid;
        const bookmarkTuit = await BookmarkController.bookmarkDao.findAllBookmarkedTuits(userid);
        res.json(bookmarkTuit);
    }

    /**
     * Find all users that bookmarked a tuit.
     * @param {Request} req Represents request from client, including the path
     * parameters 'userid' representing the user who wishes to view the users who liked bookmarked their tuit and 'tuitid' representing the id of the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of users who bookmarked the tuit.
     */
    findAllUsersThatBookmarkedTuit = async (req: Request, res: Response) => {
        const tuitid = req.params.tuidid;
        const users = await BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(tuitid);
        res.json(users);
    }
}