/**
 * @file Implements mongoose model in the follows collection
 */
import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

const FollowModel = mongoose.model("FollowModel", FollowSchema);
export default FollowModel;