/**
 * @file MessageController RESTful web service API for message resource
 */
import {Request, Response, Express} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

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
export default class MessageController implements MessageControllerI {
    private static messageController: MessageController | null = null;
    private static messageDao: MessageDao = MessageDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController == null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:from/messages/:to", MessageController.messageController.userMessagesUser);
            app.get("/api/users/:from/messages/sent", MessageController.messageController.findAllMessagesSent);
            app.get("/api/users/:by/messages/received", MessageController.messageController.findAllMessagesReceived);
            app.delete("/api/users/:userid/messages/:mid", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }
    private constructor() {}

    findAllMessagesSent = async (req: Request, res: Response) => {
        const userid = req.params.userid;
        const message = await MessageController.messageDao.findAllMessagesSent(userid);
        res.json(message);
    }

    findAllMessagesReceived = async (req: Request, res: Response) => {
        const userid = req.params.userid;
        const message = await MessageController.messageDao.findAllMessagesReceived(userid);
        res.json(message);
    }

    /**
     * Send new message
     * @param {Request} req Represents request from client, including the
     * path parameters 'userFrom' representing the user sending the message and 'userTo' representing the user
     * receiving the message. Also includes the body containing the JSON object for the new message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message
     */
    userMessagesUser = async (req: Request, res: Response) => {
        const userFrom = req.params.userFrom;
        const userTo = req.params.userto;
        const message = req.body;
        const createMessage = await MessageController.messageDao.userMessagesUser(userFrom, userTo, message);
        res.json(createMessage);
    }

    /**
     * Deletes new message
     * @param {Request} req Represents request from client, including the
     * path parameters 'userFrom' representing the user sending the message and 'userTo' representing the user
     * receiving the message.
     * @param {Response} res Represents response to client, including the deletion status
     */
    userDeletesMessage = async (req: Request, res: Response) => {
        const userFrom = req.params.userFrom;
        const userTo = req.params.userto;
        const deleteStatus = await MessageController.messageDao.userDeletesMessage(userFrom, userTo);
        res.json(deleteStatus);
    }
}