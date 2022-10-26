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
const MessageDao_1 = require("../daos/MessageDao");
/**
 * @class MessageController Implements RESTful Web service API for message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:from/messages/:to to send a message to a user.
 *     </li>
 *     <li>GET /api/users/:from/messages/sent to retrieve all messages sent by a user.
 *     </li>
 *     <li>GET /api/users/:by/messages/received to retrieve all messages received by a user.
 *     </li>
 *     <li>DELETE /api/users/:userid/messages/:mid to delete a message sent by a user.
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing likes CRUD operations
 * @property {messageController} MessageController Singleton controller implementing MessageControllerI
 * RESTful Web service API
 */
class MessageController {
    constructor() {
        this.findAllMessagesSent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userid = req.params.userid;
            const message = yield MessageController.messageDao.findAllMessagesSent(userid);
            res.json(message);
        });
        this.findAllMessagesReceived = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userid = req.params.userid;
            const message = yield MessageController.messageDao.findAllMessagesReceived(userid);
            res.json(message);
        });
        /**
         * Send new message
         * @param {Request} req Represents request from client, including the
         * path parameters 'userFrom' representing the user sending the message and 'userTo' representing the user
         * receiving the message. Also includes the body containing the JSON object for the new message
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new message
         */
        this.userMessagesUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userFrom = req.params.userFrom;
            const userTo = req.params.userto;
            const message = req.body;
            const createMessage = yield MessageController.messageDao.userMessagesUser(userFrom, userTo, message);
            res.json(createMessage);
        });
        /**
         * Deletes new message
         * @param {Request} req Represents request from client, including the
         * path parameters 'userFrom' representing the user sending the message and 'userTo' representing the user
         * receiving the message.
         * @param {Response} res Represents response to client, including the deletion status
         */
        this.userDeletesMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userFrom = req.params.userFrom;
            const userTo = req.params.userto;
            const deleteStatus = yield MessageController.messageDao.userDeletesMessage(userFrom, userTo);
            res.json(deleteStatus);
        });
    }
}
exports.default = MessageController;
MessageController.messageController = null;
MessageController.messageDao = MessageDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return MessageController
 */
MessageController.getInstance = (app) => {
    if (MessageController.messageController == null) {
        MessageController.messageController = new MessageController();
        app.post("/api/users/:from/messages/:to", MessageController.messageController.userMessagesUser);
        app.get("/api/users/:from/messages/sent", MessageController.messageController.findAllMessagesSent);
        app.get("/api/users/:by/messages/received", MessageController.messageController.findAllMessagesReceived);
        app.delete("/api/users/:userid/messages/:mid", MessageController.messageController.userDeletesMessage);
    }
    return MessageController.messageController;
};
//# sourceMappingURL=MessageController.js.map