/**
 * @file Implements mongoose model in the bookmark collection
 */
import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";

const BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema);
export default BookmarkModel;