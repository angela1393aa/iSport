const port = 3030;
const fs = require('fs');
const http = require('http');
const express = require("express");
const connection = require("./utils/db");
const path = require("path");
const socketio = require('socket.io');
const cors = require("cors");
const expressSession = require("express-session");
const { addUser, removeUser, getUser, getUsersIn } = require('./utils/users');
const { addTypingUser, removeTypingUser } = require('./utils/typingUsers');
const { newMessage, newImg } = require('./utils/message');
require("dotenv").config();
let app = express();

// Routers
let videosRouter = require("./routers/videos");
let articlesRouter = require("./routers/articles");
let cartRouter = require("./routers/cart");
let orderRouter = require("./routers/order");
let usersRouter = require("./routers/users");
let productsRouter = require("./routers/products");
const { MulterError } = require("multer");
let authRouter = require("./routers/auth");
let commentsRouter = require("./routers/comments");
let homepageRouter = require("./routers/homepage");

app.use(express.static("public"));

app.use(express.static("public"));
// 啟用session
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(
    cors({
        origin: [
            process.env.PORT_ORIGIN,
            "http://localhost:3001",
            "http://localhost:8080",
            "http://localhost:3000",
        ],
        credentials: true,
    })
);

//使用這個中間鍵才能讀到body的資料
app.use(express.urlencoded({ extended: true }));
//使用這個中間鍵才能解析json資料
app.use(express.json());
//設定靜態檔案的位置
app.use(express.static(path.join(__dirname, "public")));

// /api/videos
app.use("/api/videos", videosRouter);
app.use("/api/videos/:id/comments", commentsRouter);
// /api/articles
app.use("/api/articles", articlesRouter);
// /api/cart
app.use("/api/cart", cartRouter);
// /api/order
app.use("/api/order", orderRouter);
// /api/users
app.use("/api/users", usersRouter);
// /api/products
app.use("/api/products", productsRouter);
// /api/authe
app.use("/api/auth", authRouter);
// /api/homepage
app.use("/api/homepage", homepageRouter);

// 顯示來訪
app.use((req, res, next) => {
    let time = new Date();
    console.log(`${time} 有人來訪`);
    next();
});

// Not Found
app.use((req, res, next) => {
    res.status(404).json({ message: "404 Not Found!!" });
});

// error exception 或者設計設計自訂錯誤跳到此處
app.use((err, req, res, next) => {
    //特別處理 multer 錯誤訊息
    if (err instanceof MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "超過上傳檔案上限" });
        }
        return res.status(400).json({ message: err.message });
    }
    console.log(err);
    res.status(err.status).json({ message: err.message });
});


// Port
// app.listen(port, async function () {
//     // await connection.connectAsync();
//     console.log(`Web Server Port: ${port}`);
// });

// Socketio
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: [
            process.env.PORT_ORIGIN,
            "http://localhost:3001",
            "http://localhost:8080",
            "http://localhost:3000",
        ],
        credentials: true,
    }
});

server.listen(port, async function () {
    // await connection.connectAsync();
    console.log(`Web Server Port: ${port}`);
});

io.on('connect', (socket) => {
    socket.on('join', ({ nickname, room }, cb) => {
        const { err, user } = addUser({ id: socket.id, nickname, room });
        if (err) return cb(err);

        socket.join(user.room);
        console.log(user);

        socket.emit('message', newMessage({ user: 'iSport!', text: `歡迎加入 ${user.room} 聊天室` }));
        socket.broadcast.to(user.room).emit('message', newMessage({ user: 'iSport!', text: `${user.nickname} 已加入 ${user.room} 聊天室` }));

        io.to(user.room).emit('roomData', { users: getUsersIn(user.room), room: user.room });

        cb();
    });

    socket.on('isTyping', () => {
        const user = getUser(socket.id);
        const typingUsers = addTypingUser(user).length;

        socket.broadcast.to(user.room).emit('userTyping', typingUsers);
    });

    socket.on('cancelTyping', () => {
        const user = getUser(socket.id);
        const typingUsers = removeTypingUser(user.id).length;

        socket.broadcast.to(user.room).emit('userTyping', typingUsers);
    });

    socket.on('sendMessage', (message, cb) => {
        const user = getUser(socket.id);
        const typingUsers = removeTypingUser(user.id).length;

        io.to(user.room).emit('message', newMessage({ user: user.nickname, text: message }));
        io.to(user.room).emit('userTyping', typingUsers);
        cb();
    });

    socket.on('sendImg', (img, cb) => {
        const user = getUser(socket.id);

        cb();
        io.to(user.room).emit('image', newImg({ user: user.nickname, img: img }));
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', newMessage({ user: 'iSport!', text: `${user.nickname} 已離開 ${user.room} 聊天室` }));
            io.to(user.room).emit('roomData', { users: getUsersIn(user.room), room: user.room });
        }
    });
});