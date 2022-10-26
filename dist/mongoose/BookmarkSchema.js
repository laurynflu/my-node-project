"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for bookmarks
 */
const mongoose_1 = require("mongoose");
/**
 * @typedef Bookmark Represents a bookmark
 * @property {ObjectId[]} user User that bookmarked the tuit
 * @property {ObjectId[]} tuit Tuit bookmarked by user
 */
const BookmarkSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
    tuit: { type: mongoose_1.Schema.Types.ObjectId, ref: "TuitModel" },
}, { collection: "bookmarks" });
exports.default = BookmarkSchema;
//# sourceMappingURL=BookmarkSchema.js.map