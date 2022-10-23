import Bookmark from "../models/Bookmark";

export default interface BookmarkDaoI {
    userBookmarksTuit (userid: string, tuitid: string): Promise<Bookmark>;
    userUnbookmarksTuit (userid: string, tuitid: string): Promise<any>;
    findAllBookmarkedTuits (userid: string): Promise<Bookmark[]>;
    findBookmarkedTuit (userid: string, tuitid: string): Promise<any>;
    findAllUsersThatBookmarkedTuit (tuitid: string): Promise<Bookmark[]>;
}