import {Request, Response} from "express";
/**
 * @file Declares RESTful Web service API for Follows resource
 */
export default interface FollowControllerI {
    userFollowsUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
    whoFollowsMe (req: Request, res: Response): void;
    whoDoIFollow (req: Request, res: Response): void;
}