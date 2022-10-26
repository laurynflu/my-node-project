"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = require("../daos/UserDao");
/**
 * @class UserController Implements RESTful Web service API for user resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:userid/tuits to create a new tuit instance for
 *     a given user</li>
 *     <li>GET /api/tuits to retrieve all the tuit instances</li>
 *     <li>GET /api/tuits/:tuitid to retrieve a particular tuit instances</li>
 *     <li>GET /api/users/:userid/tuits to retrieve tuits for a given user </li>
 *     <li>PUT /api/tuits/:tuitid to modify an individual tuit instance </li>
 *     <li>DELETE /api/tuits/:tuitid to remove a particular tuit instance</li>
 * </ul>
 * @property {userDao} UserDao Singleton DAO implementing likes CRUD operations
 * @property {userController} UserController Singleton controller implementing UserControllerI
 * RESTful Web service API
 */
class UserController {
    constructor() {
        /**
         * Find all users
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the users
         */
        this.findAllUsers = (req, res) => UserController.userDao.findAllUsers()
            .then(users => res.json(users));
        /**
         * Find user by id
         * @param {Request} req Represents request from client, including path
         * parameter 'userid' representing the id of the user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the user that matches the userid
         */
        this.findUserById = (req, res) => UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
        /**
         * Creates a new user
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new user
         */
        this.createUser = (req, res) => UserController.userDao.createUser(req.body)
            .then(user => res.json(user));
        /**
         * Delete a user
         * @param {Request} req Represents request from client, including path
         * parameter 'userid' representing the id of the user
         * @param {Response} res Represents response to client, including deletion status on if deletion was successful
         */
        this.deleteUser = (req, res) => UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
        /**
         * Modifies an existing user
         * @param {Request} req Represents request from client, including path
         * parameter 'userid' representing the id of the user and body containing the JSON object for the user
         * @param {Response} res Represents response to client, including deletion status on if deletion was successful
         */
        this.updateUser = (req, res) => UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
    }
}
exports.default = UserController;
UserController.userController = null;
UserController.userDao = UserDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return UserController
 */
UserController.getInstance = (app) => {
    if (UserController.userController == null) {
        UserController.userController = new UserController();
        app.get('/api/users', UserController.userController.findAllUsers);
        app.get('/api/users/:userid', UserController.userController.findUserById);
        app.post('/api/users', UserController.userController.createUser);
        app.delete('/api/users/:userid', UserController.userController.deleteUser);
        app.put('/api/users/:userid', UserController.userController.updateUser);
    }
    return UserController.userController;
};
//# sourceMappingURL=UserController.js.map