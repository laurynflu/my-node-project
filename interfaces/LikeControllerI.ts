import {Request, Response} from "express";

/**
 * @file Declares RESTful Web service API for Likes resource
 */
export default interface LikeControllerI {
    findAllTuitsLiked (req: Request, res: Response): void;
    findAllUsersThatLikedTuit (req: Request, res: Response): void;
    userLikesTuit (req: Request, res: Response): void;
    userUnlikesTuit (req: Request, res: Response): void;
}