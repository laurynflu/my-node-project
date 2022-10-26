import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    userBookmarksTuit = async (userid: string, tuitid: string): Promise<Bookmark> =>
        BookmarkModel.create({user: userid, tuit: tuitid});

    userUnbookmarksTuit = async (userid: string, tuitid: string): Promise<any> =>
        BookmarkModel.deleteOne({user: userid, tuit: tuitid});

    findAllBookmarkedTuits = async (userid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({user: userid}).populate("tuit").exec();

    findBookmarkedTuit = async (userid: string, tuitid: string): Promise<any> =>
        BookmarkModel.findOne({user: userid, tuit: tuitid}).populate("tuit").exec();

    findAllUsersThatBookmarkedTuit = async (tuitid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({tuit: tuitid}).populate("user").exec();
}