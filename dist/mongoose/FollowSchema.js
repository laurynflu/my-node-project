"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for follows
 */
const mongoose_1 = require("mongoose");
/**
 * @typedef Follow Represents a follow
 * @property {ObjectId[]} follower User following another user
 * @property {ObjectId[]} following User the follower is following
 */
const FollowSchema = new mongoose_1.default.Schema({
    follower: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
    following: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "follows" });
exports.default = FollowSchema;
//# sourceMappingURL=FollowSchema.js.map