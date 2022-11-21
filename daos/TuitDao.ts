/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Uses TuitModel to find all tuit from tuits collection
     * @returns Promise To be notified when the tuits are retrieved fromdatabase
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find().populate('postedBy', 'username').exec();
    }

    /**
     * Uses TuitModel to find all tuits from tuits collection by a particular user
     * @param {string} userid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    async findTuitsByUser(userid: string): Promise<Tuit[]>{
        return await TuitModel.find({'postedBy': userid}).populate('postedBy', 'username').exec();
    }

    /**
     * Uses TuitModel to find single tuit document by id from tuits collection
     * @param {string} tuitid id of tuit
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    async findTuitById(tuitid: string): Promise<any> {
        return await TuitModel.findById(tuitid).populate('postedBy', 'username').exec();
    }

    /**
     * Create tuit
     * @param {Tuit} tuit to be added
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async createTuit(tuit: Tuit): Promise<Tuit>{
        return await TuitModel.create(tuit);
    }

    /**
     * Updates tuit
     * @param {string} tuitid id of tuit to be updated
     * @param {any} tuit Tuit object with updated information
     * @returns Promise To be notified when tuit is updated in the database
     */
    async updateTuit(tuitid: string, tuit: any): Promise<any> {
        return TuitModel.updateOne({_id: tuitid},
            {$set: {tuit: tuit.tuit, postedOn: tuit.postedOn, postedBy: tuit.postedBy}})
    }

    public async updateLikes(tuitid: string, newLikeCount: any): Promise<any> {
        return TuitModel.updateOne({_id: tuitid}, {$set: {stats: newLikeCount}});
    }

    /**
     * Delete tuit
     * @param {string} tuitid id of tuit to be deleted
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuit(tuitid: string): Promise<any>{
        return await TuitModel.deleteOne({_id: tuitid});
    }
}