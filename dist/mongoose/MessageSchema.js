"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for messages
 */
const mongoose_1 = require("mongoose");
/**
 * @typedef Message Represents a message between two users
 * @property {string} message Body of the message
 * @property {ObjectId[]} to User that the message is for
 * @property {ObjectId[]} from User that the message is from
 * @property {Date} sentOn Date the message was sent on
 */
const MessageSchema = new mongoose_1.default.Schema({
    message: { type: String, required: true },
    to: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
    sentOn: { type: Date, default: Date.now },
}, { collection: "messages" });
exports.default = MessageSchema;
//# sourceMappingURL=MessageSchema.js.map