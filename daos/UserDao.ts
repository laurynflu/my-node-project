import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    public static getInstance = (): UserDao => {
        if(UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    private constructor() {}

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
    async deleteUser(userid: string): Promise<any> {
        return await UserModel.deleteOne({_id: userid});
    }

    async updateUser(userid: string, user: any): Promise<any> {
        return await UserModel.updateOne({_id: userid},
            {$set: {username: user.username, password: user.password}});
    }
}
