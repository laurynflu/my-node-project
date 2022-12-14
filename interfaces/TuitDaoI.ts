import Tuit from "../models/Tuit";

/**
 * @file Declares API for Tuits related data access object methods
 */
export default interface TuitDaoI {
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(userid: string): Promise<Tuit[]>;
    findTuitById(id: string): Promise<Tuit>;
    createTuit(tuit: Tuit): Promise<Tuit>;
    updateTuit(tuitid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tuitid: string): Promise<any>;
}
