"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model in the bookmark collection
 */
const mongoose_1 = require("mongoose");
const BookmarkSchema_1 = require("./BookmarkSchema");
const BookmarkModel = mongoose_1.default.model("BookmarkModel", BookmarkSchema_1.default);
exports.default = BookmarkModel;
//# sourceMappingURL=BookmarkModel.js.map