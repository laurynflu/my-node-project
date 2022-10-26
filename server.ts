/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import mongoose from "mongoose";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
var cors = require('cors')


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

mongoose.connect('mongodb://localhost:27017/fse-tuiter', options);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

// create RESTful Web service API
UserController.getInstance(app);
TuitController.getInstance(app);
LikeController.getInstance(app);
FollowController.getInstance(app);
BookmarkController.getInstance(app);
MessageController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
