/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Inserts bookmark instance into the database
     * @param {string} userid id of the user that bookmarked the tuit
     * @param {string} tuitid id of the tuit that was bookmarked by user
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (userid: string, tuitid: string): Promise<Bookmark> =>
        BookmarkModel.create({user: userid, tuit: tuitid});

    /**
     * Removes bookmark
     * @param {string} userid id of the user that unbookmarked the tuit
     * @param {string} tuitid id of the tuit that was unbookmarked by user
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksTuit = async (userid: string, tuitid: string): Promise<any> =>
        BookmarkModel.deleteOne({user: userid, tuit: tuitid});

    /**
     * Retrieve all bookmark documents using the BookmarkModel
     * @param {string} userid id of the user that bookmarked tuits
     * @returns Promise To be notified when the bookmarks are retrieved from database
     */
    findAllBookmarkedTuits = async (userid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({user: userid}).populate("tuit").exec();

    /**
     * Retrieve all users that bookmarked tuits using the BookmarkModel
     * @param {string} tuitid id of the tuit that users bookmarked
     * @returns Promise To be notified when bookmarks are retrieved from database
     */
    findAllUsersThatBookmarkedTuit = async (tuitid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({tuit: tuitid}).populate("user").exec();
}