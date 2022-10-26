import {Request, Response, Express} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

export default class MessageController implements MessageControllerI {
    private static messageController: MessageController | null = null;
    private static messageDao: MessageDao = MessageDao.getInstance();

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController == null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:from/messages/:to", MessageController.messageController.userMessagesUser);
            app.get("/api/users/:from/messages/sent", MessageController.messageController.findAllMessagesSent);
            app.get("/api/users/:by/messages/received", MessageController.messageController.findAllMessagesReceived);
            app.delete("/api/users/:uid/messages/:mid", MessageController.messageController.userDeletesMessage);
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

    userMessagesUser = async (req: Request, res: Response) => {
        const userFrom = req.params.userFrom;
        const userTo = req.params.userto;
        const message = req.body;
        const createMessage = await MessageController.messageDao.userMessagesUser(userFrom, userTo, message);
        res.json(createMessage);
    }

    userDeletesMessage = async (req: Request, res: Response) => {
        const userFrom = req.params.userFrom;
        const userTo = req.params.userto;
        const deleteStatus = await MessageController.messageDao.userDeletesMessage(userFrom, userTo);
        res.json(deleteStatus);
    }
}