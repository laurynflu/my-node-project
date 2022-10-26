"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model in the likes collection
 */
const mongoose_1 = require("mongoose");
const LikeSchema_1 = require("./LikeSchema");
const LikeModel = mongoose_1.default.model("LikeModel", LikeSchema_1.default);
exports.default = LikeModel;
//# sourceMappingURL=LikeModel.js.map