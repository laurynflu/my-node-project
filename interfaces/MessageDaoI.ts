import Message from "../models/Message";
import userModel from "../mongoose/UserModel";

export default interface MessageDaoI {
    userMessagesUser (from: string, to: string, message: Message): Promise<Message>;
    userDeletesMessage (from: string, to: string): Promise<any>;
    findAllMessagesSent (userid: string): Promise<Message[]>;
    findAllMessagesReceived (userid: string): Promise<Message[]>;
}