import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find().populate('postedBy', 'username').exec();
    }

    async findTuitsByUser(userid: string): Promise<Tuit[]>{
        return await TuitModel.find({'postedBy': userid}).populate('postedBy', 'username').exec();
    }

    async findTuitById(tuitid: string): Promise<any> {
        return await TuitModel.findById(tuitid).populate('postedBy', 'username').exec();
    }

    async createTuit(tuit: Tuit): Promise<Tuit>{
        return await TuitModel.create(tuit);
    }
    async updateTuit(tuitid: string, tuit: any): Promise<any> {
        return TuitModel.updateOne({_id: tuitid},
            {$set: {tuit: tuit.tuit, postedOn: tuit.postedOn, postedBy: tuit.postedBy}})
    }
    async deleteTuit(tuitid: string): Promise<any>{
        return await TuitModel.deleteOne({_id: tuitid});
    }
}