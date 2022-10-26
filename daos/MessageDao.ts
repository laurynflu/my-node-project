/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import MessageDaoI from "../interfaces/MessageDaoI";
import userModel from "../mongoose/UserModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    /**
     * User messages user
     * @param {string} from id of the user sending the message
     * @param {string} to id of the user receiving the message
     * @param {Message} message message instance to be inserted into the database
     * @returns Promise To be notified when message is inserted into the database
     */
    userMessagesUser = async (from: string, to: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, from, to});

    /**
     * User deletes a message
     * @param {string} from id of the user that sent the message
     * @param {string} to id of the user that received the message
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage = async (from: string, to: string): Promise<any> =>
        userModel.deleteOne({from, to});

    /**
     * Use MessageModel to find sent messages
     * @param {string} userid id of the user that sent the messages
     * @returns Promise To be notified when the messages are retrieved from database
     */
    findAllMessagesSent = async (userid: string): Promise<Message[]> =>
        MessageModel.find({to: userid}).populate("message", "to").exec();

    /**
     * Use MessageModel to find all messages received
     * @param {string} userid id of the user that received the messages
     * @returns Promise To be notified when the messages are retrieved from database
     */
    findAllMessagesReceived = async (userid: string): Promise<Message[]> =>
        MessageModel.find({to: userid}).populate("message", "from").exec();

}