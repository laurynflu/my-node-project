/**
 * @file Implements an Express Node HTTP server.
 */
import * as express from 'express';
import {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import mongoose from "mongoose";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";

const session = require("express-session");

const app = express();
let sess = {
    secret: process.env.SECRET,
    cookie: {
        secure: false
    }
}

if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

mongoose.connect('mongodb+srv://lflu2:FJCWMN7z4s0vXCIh@cluster0.tjrosmd.mongodb.net/?retryWrites=true&w=majority', options);


app.use(express.json());

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
const PORT = 4002;
app.listen(process.env.PORT || PORT);
