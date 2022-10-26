import Bookmark from "../models/Bookmark";

export default interface BookmarkDaoI {
    userBookmarksTuit (userid: string, tuitid: string): Promise<Bookmark>;
    userUnbookmarksTuit (userid: string, tuitid: string): Promise<any>;
    findAllBookmarkedTuits (userid: string): Promise<Bookmark[]>;
    findAllUsersThatBookmarkedTuit (tuitid: string): Promise<Bookmark[]>;
}