/**
 * @file Implements mongoose schema for follows
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 * @typedef Follow Represents a follow
 * @property {ObjectId[]} follower User following another user
 * @property {ObjectId[]} following User the follower is following
 */
const FollowSchema = new mongoose.Schema<Follow>({
    follower: {type: Schema.Types.ObjectId, ref: "UserModel"},
    following: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;