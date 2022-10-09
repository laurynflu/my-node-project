import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";
import {Query} from "mongoose";

export default class TuitDao implements TuitDaoI {

    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find();
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]>{
        return TuitModel.find({postedBy: uid});
    }

    async findTuitById(tid: string): Promise<Query<any, any, {}, any>>{
        return TuitModel.findById(tid);
    }

    async createTuit(tuit: Tuit): Promise<Tuit>{
        return await TuitModel.create(tuit);
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }
    async deleteTuit(tid: string): Promise<any>{
        return TuitModel.deleteOne({_id: tid});
    }
}