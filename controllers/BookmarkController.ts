import {Request, Response, Express} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkController: BookmarkController | null = null;
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();

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

    userBookmarksTuit = async (req: Request, res: Response) => {
        const userid = req.params.userid;
        const tuitid = req.params.tuidid;
        const bookmark = await BookmarkController.bookmarkDao.userBookmarksTuit(userid, tuitid);
        res.json(bookmark);
    }

    userUnbookmarksTuit = async (req: Request, res: Response) => {
        const userid = req.params.userid;
        const tuitid = req.params.tuidid;
        const bookmarkStatus = await BookmarkController.bookmarkDao.userUnbookmarksTuit(userid, tuitid);
        res.json(bookmarkStatus);
    }

    findAllBookmarkedTuits = async (req: Request, res: Response) => {
        const userid = req.params.userid;
        const bookmarkTuit = await BookmarkController.bookmarkDao.findAllBookmarkedTuits(userid);
        res.json(bookmarkTuit);
    }

    findAllUsersThatBookmarkedTuit = async (req: Request, res: Response) => {
        const tuitid = req.params.tuidid;
        const users = await BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(tuitid);
        res.json(users);
    }
}