"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model in the messages collection
 */
const MessageSchema_1 = require("./MessageSchema");
const mongoose_1 = require("mongoose");
const MessageModel = mongoose_1.default.model("MessageModel", MessageSchema_1.default);
exports.default = MessageModel;
//# sourceMappingURL=MessageModel.js.map