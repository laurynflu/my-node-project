/**
 * @file TuitController RESTful web service API for tuit resource
 */
import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";

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
export default class TuitController implements TuitControllerI {
    private static tuitController: TuitController | null = null;
    private static tuitDao: TuitDao = TuitDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): TuitController => {
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
    }
    private constructor() {}

    /**
     * Get all tuits
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));

    /**
     * Get tuit by id
     * @param {Request} req Represents request from client, including path
     * parameter 'tuitid' representing the id of the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit that matches the tuitid
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit));

    /**
     * Get tuit by user
     * @param {Request} req Represents request from client, including path
     * parameter 'userid' representing the id of the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit that matches the userid
     */
    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.userid)
            .then(tuits => res.json(tuits));

    /**
     * Creates a new tuit
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit
     */
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));

    /**
     * Delete a tuit
     * @param {Request} req Represents request from client, including path
     * parameter 'tuitid' representing the id of the tuit to be removed
     * @param {Response} res Represents response to client, including deletion status of if a tuit was deleted or not
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tuitid)
            .then(status => res.json(status));

    /**
     * Update an existing tuit
     * @param {Request} req Represents request from client, including path parameter 'tuitid' identifying the id of the
     * tuit to be modified and body containing the JSON object for the tuit to be updated
     * @param {Response} res Represents response to client, including deletion status on if update was successful or not
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tuitid, req.body)
            .then(status => res.json(status));
}