
/**
 * @file Declares Like data type representing relationship between users and tuits, user liked/unliked a tuit
 */
import Tuit from "./Tuit";
import User from "./User";

/**
 * @typedef Like Represents likes relationship between a user and a tuit,user liked/unliked a tuit
 * @property {Tuit} tuit Tuit being liked
 * @property {User} likedBy User liking the tuit
 */
export default interface Like {
    tuit: Tuit;
    likedBy: User;
}