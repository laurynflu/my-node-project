import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsUser (follower: string, following: string): Promise<Follow>;
    userUnfollowsUser (follower: string, following: string): Promise<any>;
    whoFollowsMe (followingMe: string): Promise<Follow[]>;
    whoDoIFollow (iFollow: string): Promise<Follow[]>;
}