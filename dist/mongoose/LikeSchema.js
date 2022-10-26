"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for likes
 */
const mongoose_1 = require("mongoose");
/**
 * @typedef Like Represents a like
 * @property {ObjectId[]} tuit Tuit liked by the user
 * @property {ObjectId[]} likedBy User that liked the tuit
 */
const LikeSchema = new mongoose_1.default.Schema({
    tuit: { type: mongoose_1.Schema.Types.ObjectId, ref: "TuitModel" },
    likedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "likes" });
exports.default = LikeSchema;
//# sourceMappingURL=LikeSchema.js.map