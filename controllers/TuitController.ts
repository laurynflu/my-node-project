import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";

export default class TuitController implements TuitControllerI {
    private static tuitController: TuitController | null = null;
    private static tuitDao: TuitDao = TuitDao.getInstance();

    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController == null) {
            TuitController.tuitController = new TuitController();
            app.get('/api/users', TuitController.tuitController.findAllTuits);
            app.get('/api/users/:userid', TuitController.tuitController.findTuitById);
            app.post('/api/users', TuitController.tuitController.findTuitsByUser);
            app.post('/api/users', TuitController.tuitController.createTuit);
            app.delete('/api/users/:userid', TuitController.tuitController.deleteTuit);
            app.put('/api/users/:userid', TuitController.tuitController.updateTuit);
        }
        return TuitController.tuitController;
    }
    private constructor() {}

    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit));


    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.userid)
            .then(tuits => res.json(tuits));


    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));


    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tuitid)
            .then(status => res.json(status));


    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tuitid, req.body)
            .then(status => res.json(status));
}