"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TuitDao_1 = require("../daos/TuitDao");
/**
 * @class TuitController Implements RESTful Web service API for tuit resource.
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
 * @property {TuitDao} TuitDao Singleton DAO implementing likes CRUD operations
 * @property {tuitController} TuitController Singleton controller implementing TuitControllerI
 * RESTful Web service API
 */
class TuitController {
    constructor() {
        /**
         * Get all tuits
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findAllTuits = (req, res) => TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
        /**
         * Get tuit by id
         * @param {Request} req Represents request from client, including path
         * parameter 'tuitid' representing the id of the tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the tuit that matches the tuitid
         */
        this.findTuitById = (req, res) => TuitController.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit));
        /**
         * Get tuit by user
         * @param {Request} req Represents request from client, including path
         * parameter 'userid' representing the id of the user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the tuit that matches the userid
         */
        this.findTuitsByUser = (req, res) => TuitController.tuitDao.findTuitsByUser(req.params.userid)
            .then(tuits => res.json(tuits));
        /**
         * Creates a new tuit
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new tuit
         */
        this.createTuit = (req, res) => TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
        /**
         * Delete a tuit
         * @param {Request} req Represents request from client, including path
         * parameter 'tuitid' representing the id of the tuit to be removed
         * @param {Response} res Represents response to client, including deletion status of if a tuit was deleted or not
         */
        this.deleteTuit = (req, res) => TuitController.tuitDao.deleteTuit(req.params.tuitid)
            .then(status => res.json(status));
        /**
         * Update an existing tuit
         * @param {Request} req Represents request from client, including path parameter 'tuitid' identifying the id of the
         * tuit to be modified and body containing the JSON object for the tuit to be updated
         * @param {Response} res Represents response to client, including deletion status on if update was successful or not
         */
        this.updateTuit = (req, res) => TuitController.tuitDao.updateTuit(req.params.tuitid, req.body)
            .then(status => res.json(status));
    }
}
exports.default = TuitController;
TuitController.tuitController = null;
TuitController.tuitDao = TuitDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
TuitController.getInstance = (app) => {
    if (TuitController.tuitController == null) {
        TuitController.tuitController = new TuitController();
        app.get('/api/tuits', TuitController.tuitController.findAllTuits);
        app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
        app.get('/api/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
        app.post('/api/tuits', TuitController.tuitController.createTuit);
        app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);
        app.put('/api/tuits/:tid', TuitController.tuitController.updateTuit);
    }
    return TuitController.tuitController;
};
//# sourceMappingURL=TuitController.js.map