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
/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
const User_1 = require("../models/User");
const UserModel_1 = require("../mongoose/UserModel");
/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
class UserDao {
    constructor() { }
    /**
     * Use UserModel to find all users
     * @returns Promise To be notified when the users are retrieved from database
     */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModels = yield UserModel_1.default.find();
            const userModels = userMongooseModels.map((userMongooseModel) => {
                var _a, _b, _c, _d, _e, _f;
                return new User_1.default((_a = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.id.toString()) !== null && _a !== void 0 ? _a : '', (_b = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.username) !== null && _b !== void 0 ? _b : '', (_c = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.password) !== null && _c !== void 0 ? _c : '', (_d = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.firstName) !== null && _d !== void 0 ? _d : '', (_e = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.lastName) !== null && _e !== void 0 ? _e : '', (_f = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.email) !== null && _f !== void 0 ? _f : '');
            });
            return userModels;
        });
    }
    /**
     * Use UserModel to find user by id
     * @param {string} userid users id
     * @returns Promise To be notified when user is retrieved from the database
     */
    findUserById(userid) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModel = yield UserModel_1.default.findById(userid);
            return new User_1.default((_a = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.id.toString()) !== null && _a !== void 0 ? _a : '', (_b = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.username) !== null && _b !== void 0 ? _b : '', (_c = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.password) !== null && _c !== void 0 ? _c : '', (_d = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.firstName) !== null && _d !== void 0 ? _d : '', (_e = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.lastName) !== null && _e !== void 0 ? _e : '', (_f = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.email) !== null && _f !== void 0 ? _f : '');
        });
    }
    /**
     * Create a user
     * @param {User} userid user to be added to database
     * @returns Promise To be notified when user is inserted into the database
     */
    createUser(userid) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModel = yield UserModel_1.default.create(userid);
            return new User_1.default((_a = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.id.toString()) !== null && _a !== void 0 ? _a : '', (_b = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.username) !== null && _b !== void 0 ? _b : '', (_c = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.password) !== null && _c !== void 0 ? _c : '', (_d = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.firstName) !== null && _d !== void 0 ? _d : '', (_e = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.lastName) !== null && _e !== void 0 ? _e : '', (_f = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.email) !== null && _f !== void 0 ? _f : '');
        });
    }
    /**
     * Delete user
     * @param {string} userid id of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    deleteUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.deleteOne({ _id: userid });
        });
    }
    /**
     * Updates user
     * @param {string} userid id of user to be modified
     * @param {any} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    updateUser(userid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.updateOne({ _id: userid }, { $set: { username: user.username, password: user.password } });
        });
    }
}
exports.default = UserDao;
UserDao.userDao = null;
/**
 * Creates singleton DAO instance
 * @returns UserDao
 */
UserDao.getInstance = () => {
    if (UserDao.userDao === null) {
        UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
};
//# sourceMappingURL=UserDao.js.map