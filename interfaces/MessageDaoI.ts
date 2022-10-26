import Message from "../models/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    userMessagesUser (from: string, to: string, message: Message): Promise<Message>;
    userDeletesMessage (from: string, to: string): Promise<any>;
    findAllMessagesSent (userid: string): Promise<Message[]>;
    findAllMessagesReceived (userid: string): Promise<Message[]>;
}