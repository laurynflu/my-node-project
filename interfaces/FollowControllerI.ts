import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowsUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
    whoFollowsMe (req: Request, res: Response): void;
    whoDoIFollow (req: Request, res: Response): void;
    findUserIAmFollowing (req: Request, res: Response): void;
    findUserFollowingMe (req: Request, res: Response): void;
}