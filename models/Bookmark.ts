/**
 * @file Declares Bookmark data type representing relationship between users and tuits, user bookmark/unbookmark a tuit
 */
import User from "./User";
import Tuit from "./Tuit";

/**
 * @typedef Bookmark Represents user bookmarking a tuit
 * @property {User} user The user that bookmarks a tuit
 * @property {Tuit} tuit The tuit that is bookmarked by a user
 */
export default interface Bookmark {
    user: User;
    tuit: Tuit;
}