/**
 * @file Implements mongoose schema for bookmarks
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";

/**
 * @typedef Bookmark Represents a bookmark
 * @property {ObjectId[]} user User that bookmarked the tuit
 * @property {ObjectId[]} tuit Tuit bookmarked by user
 */

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;