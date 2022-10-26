"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model in the follows collection
 */
const mongoose_1 = require("mongoose");
const FollowSchema_1 = require("./FollowSchema");
const FollowModel = mongoose_1.default.model("FollowModel", FollowSchema_1.default);
exports.default = FollowModel;
//# sourceMappingURL=FollowModel.js.map