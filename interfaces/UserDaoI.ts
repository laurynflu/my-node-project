import User from "../models/User";

/**
 * @file Declares API for Users related data access object methods
 */
export default interface UserDaoI {
    findAllUsers(): Promise<User[]>;
    findUserById(userid: string): Promise<any>;
    createUser(user: User): Promise<User>;
    updateUser(userid: string, user: User): Promise<any>;
    deleteUser(userid: string): Promise<any>;
}
