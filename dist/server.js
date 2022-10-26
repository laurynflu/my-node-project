"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server.
 */
const express = require("express");
const UserController_1 = require("./controllers/UserController");
const TuitController_1 = require("./controllers/TuitController");
const LikeController_1 = require("./controllers/LikeController");
const mongoose_1 = require("mongoose");
const FollowController_1 = require("./controllers/FollowController");
const BookmarkController_1 = require("./controllers/BookmarkController");
const MessageController_1 = require("./controllers/MessageController");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};
mongoose_1.default.connect('mongodb+srv://lflu2:FJCWMN7z4s0vXCIh@cluster0.tjrosmd.mongodb.net/?retryWrites=true&w=majority', options);
const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('Welcome!'));
// create RESTful Web service API
UserController_1.default.getInstance(app);
TuitController_1.default.getInstance(app);
LikeController_1.default.getInstance(app);
FollowController_1.default.getInstance(app);
BookmarkController_1.default.getInstance(app);
MessageController_1.default.getInstance(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4002;
app.listen(process.env.PORT || PORT);
//# sourceMappingURL=server.js.map