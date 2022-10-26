/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns UserDao
     */
    public static getInstance = (): UserDao => {
        if(UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    private constructor() {}

    /**
     * Use UserModel to find all users
     * @returns Promise To be notified when the users are retrieved from database
     */
    async findAllUsers(): Promise<User[]> {
        const userMongooseModels = await UserModel.find();
        const userModels = userMongooseModels.map((userMongooseModel) => {
            return new User(
                userMongooseModel?.id.toString()??'',
                userMongooseModel?.username??'',
                userMongooseModel?.password??'',
                userMongooseModel?.firstName??'',
                userMongooseModel?.lastName??'',
                userMongooseModel?.email??'',)
        });
        return userModels;
    }

    /**
     * Use UserModel to find user by id
     * @param {string} userid users id
     * @returns Promise To be notified when user is retrieved from the database
     */
    async findUserById(userid: string): Promise<User> {
        const userMongooseModel = await UserModel.findById(userid);
        return new User(
            userMongooseModel?.id.toString() ?? '',
            userMongooseModel?.username ?? '',
            userMongooseModel?.password ?? '',
            userMongooseModel?.firstName ?? '',
            userMongooseModel?.lastName ?? '',
            userMongooseModel?.email ?? '',
        );
    }

    /**
     * Create a user
     * @param {User} userid user to be added to database
     * @returns Promise To be notified when user is inserted into the database
     */
    async createUser(userid: User): Promise<User> {
        const userMongooseModel = await UserModel.create(userid);
        return new User(
            userMongooseModel?.id.toString() ?? '',
            userMongooseModel?.username ?? '',
            userMongooseModel?.password ?? '',
            userMongooseModel?.firstName ?? '',
            userMongooseModel?.lastName ?? '',
            userMongooseModel?.email ?? '',
        );
    }

    /**
     * Delete user
     * @param {string} userid id of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    async deleteUser(userid: string): Promise<any> {
        return UserModel.deleteOne({_id: userid});
    }

    /**
     * Updates user
     * @param {string} userid id of user to be modified
     * @param {any} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    async updateUser(userid: string, user: any): Promise<any> {
        return UserModel.updateOne({_id: userid},
            {$set: {username: user.username, password: user.password}});
    }
}
