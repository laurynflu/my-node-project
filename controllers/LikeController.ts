import {Request, Response, Express} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeControllerI";

export default class LikeController implements LikeControllerI {
    private static likeController: LikeController | null = null;
    private static likeDao: LikeDao = LikeDao.getInstance();

    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController == null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:userid/likes", LikeController.likeController.findAllTuitsLiked);
            app.get("/api/tuits/:tuitid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
            app.post("/api/users/:userid/likes/:tuitid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:userid/unlikes/:tuitid", LikeController.likeController.userUnlikesTuit);
        }
        return LikeController.likeController;
    }
    private constructor() {}

    findAllTuitsLiked = (req: Request, res: Response) => {
        LikeController.likeDao.findAllTuitsLiked(req.params.userid)
            .then(likes => res.json(likes));
    }

    findAllUsersThatLikedTuit = (req: Request, res: Response) => {
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tuitid)
            .then(likes => res.json(likes));
    }

    userLikesTuit = (req: Request, res: Response) => {
        LikeController.likeDao.userLikesTuit(req.params.userid, req.params.tuitid)
            .then(likes => res.json(likes));
    }

    userUnlikesTuit = (req: Request, res: Response) => {
        LikeController.likeDao.userUnlikesTuit(req.params.userid, req.params.tuitid)
            .then(likeStatus => res.json(likeStatus));
    }

}