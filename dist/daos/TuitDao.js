"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitModel_1 = require("../mongoose/TuitModel");
/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
class TuitDao {
    constructor() { }
    /**
     * Uses TuitModel to find all tuit from tuits collection
     * @returns Promise To be notified when the tuits are retrieved fromdatabase
     */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.find().populate('postedBy', 'username').exec();
        });
    }
    /**
     * Uses TuitModel to find all tuits from tuits collection by a particular user
     * @param {string} userid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findTuitsByUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.find({ 'postedBy': userid }).populate('postedBy', 'username').exec();
        });
    }
    /**
     * Uses TuitModel to find single tuit document by id from tuits collection
     * @param {string} tuitid id of tuit
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    findTuitById(tuitid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.findById(tuitid).populate('postedBy', 'username').exec();
        });
    }
    /**
     * Create tuit
     * @param {Tuit} tuit to be added
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuit(tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.create(tuit);
        });
    }
    /**
     * Updates tuit
     * @param {string} tuitid id of tuit to be updated
     * @param {any} tuit Tuit object with updated information
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit(tuitid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tuitid }, { $set: { tuit: tuit.tuit, postedOn: tuit.postedOn, postedBy: tuit.postedBy } });
        });
    }
    /**
     * Delete tuit
     * @param {string} tuitid id of tuit to be deleted
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit(tuitid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.deleteOne({ _id: tuitid });
        });
    }
    updateLikes =
        async (tid, newStats) =>
            TuitModel.updateOne(
                {_id: tid},
                {$set: {stats: newStats}});
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
 * Creates singleton DAO instance
 * @returns TuitDao
 */
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
//# sourceMappingURL=TuitDao.js.map