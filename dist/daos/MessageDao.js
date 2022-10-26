"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel_1 = require("../mongoose/MessageModel");
const UserModel_1 = require("../mongoose/UserModel");
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
class MessageDao {
    constructor() {
        /**
         * User messages user
         * @param {string} from id of the user sending the message
         * @param {string} to id of the user receiving the message
         * @param {Message} message message instance to be inserted into the database
         * @returns Promise To be notified when message is inserted into the database
         */
        this.userMessagesUser = (from, to, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.create(Object.assign(Object.assign({}, message), { from, to })); });
        /**
         * User deletes a message
         * @param {string} from id of the user that sent the message
         * @param {string} to id of the user that received the message
         * @returns Promise To be notified when message is removed from the database
         */
        this.userDeletesMessage = (from, to) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.deleteOne({ from, to }); });
        /**
         * Use MessageModel to find sent messages
         * @param {string} userid id of the user that sent the messages
         * @returns Promise To be notified when the messages are retrieved from database
         */
        this.findAllMessagesSent = (userid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.find({ to: userid }).populate("message", "to").exec(); });
        /**
         * Use MessageModel to find all messages received
         * @param {string} userid id of the user that received the messages
         * @returns Promise To be notified when the messages are retrieved from database
         */
        this.findAllMessagesReceived = (userid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.find({ to: userid }).populate("message", "from").exec(); });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
/**
 * Creates singleton DAO instance
 * @returns MessageDao
 */
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
//# sourceMappingURL=MessageDao.js.map