/**
 * @file Implements mongoose model in the messages collection
 */
import MessageSchema from "./MessageSchema";
import mongoose from "mongoose";

const MessageModel = mongoose.model("MessageModel", MessageSchema);
export default MessageModel;