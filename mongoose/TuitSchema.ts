/**
 * @file Implements mongoose schema for tuits
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit Body of the tuit
 * @property {Date} postedOn Date the tuit was posted on
 * @property {ObjectId[]} postedBy User that posted the tuit
 */
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId,
        ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0}
    }
}, {collection: "tuits"});
export default TuitSchema;