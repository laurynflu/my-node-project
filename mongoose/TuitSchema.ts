/**
 * @file Implements mongoose schema for tuits
 */
import mongoose from "mongoose";
import Tuit from "../models/Tuit";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit Body of the tuit
 * @property {Date} postedOn Date the tuit was posted on
 * @property {ObjectId[]} postedBy User that posted the tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'tuits'});
export default TuitSchema;