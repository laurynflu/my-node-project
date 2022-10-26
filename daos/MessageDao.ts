import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import MessageDaoI from "../interfaces/MessageDaoI";
import userModel from "../mongoose/UserModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    userMessagesUser = async (from: string, to: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, from, to});


    userDeletesMessage = async (from: string, to: string): Promise<any> =>
        userModel.deleteOne({from, to});

    findAllMessagesSent = async (userid: string): Promise<Message[]> =>
        MessageModel.find({to: userid}).populate("message", "to").exec();

    findAllMessagesReceived = async (userid: string): Promise<Message[]> =>
        MessageModel.find({to: userid}).populate("message", "from").exec();

}