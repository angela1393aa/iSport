// 跟會員中心有關的路由
const express = require("express");
const router = express.Router();
const { cloudinary, storage } = require('../cloudinary');
const { SignInCheckMiddleware } = require("../middlewares/auth");
const connection = require('../utils/db');
//密碼加密用
const bcrypt = require("bcrypt");
//上傳檔案用的亂數名稱
// const { uuid } = require('uuidv4');
// 處理formData需要用到的中間件
const multer = require("multer");

const uploader = multer({
    storage,
    // 檔案驗證，限定檔案類型
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype !== "image/jpeg" &&
            file.mimetype !== "image/jpg" &&
            file.mimetype !== "image/png"

        ) {
            cb(new Error("檔案類型錯誤"), false);
        }
        cb(null, true);
    },
    //檔案大小1024*1024等於1M
    limits: {
        fileSize: 1024 * 1024,
    }
});
//處理 檔案路徑
// const path = require("path");
// const { json } = require("express");
//設定上傳檔案的位置，diskStorage為本機硬碟
// const storage = multer.diskStorage({
//     // 檔案存取位置
//     destination: function (req, file, callback) {
//         callback(null, path.join(__dirname, "../", "public", "uploads"));
//     },
//     // 檔案命名
//     filename: function (req, file, cb) {
//         const ext = file.originalname.split(".").pop();
//         cb(null, `member-${uuid()}.${ext}`);
//     }
// });
// const uploader = multer({
//     storage: storage,
//     // 檔案驗證，限定檔案類型
//     fileFilter: function (req, file, cb) {
//         if (
//             file.mimetype !== "image/jpeg" &&
//             file.mimetype !== "image/jpg" &&
//             file.mimetype !== "image/png"

//         ) {
//             cb(new Error("檔案類型錯誤"), false);
//         }
//         cb(null, true);
//     },
//     //檔案大小1024*1024等於1M
//     limits: {
//         fileSize: 1024 * 1024,
//     }
// });

// 這一個 router 的路由都會先經過這個中間件
router.use(SignInCheckMiddleware);
// 重新整理取得特定會員資料
router.get("/reset", async (req, res, next) => {
    let member = await connection.queryAsync(
        "SELECT * FROM users WHERE account=?",
        [req.session.member.account]
    );
    member = member[0];
    let resetMember = {
        id: member.id,
        account: member.account,
        email: member.email,
        name: member.name,
        phone: member.phone,
        address: member.address,
        birthday: member.birthday,
        gender: member.gender,
        aboutme: member.about,
        photo: member.photo,
    };
    console.log("刷新頁面");
    //console.log("我是req.session.member:",req.session.member[0])
    req.session.member = resetMember;
    res.json(req.session.member);
});

// 修改會員資料
router.route("/:account")
    .put(async (req, res, next) => {
        try {
            if (req.body.password) {
                // 如果前端有送密碼來
                // let bcrtptpasswoord= await bcrypt.hash(req.body.password,10);

                let UpDateMemberData = await connection.queryAsync(
                    "UPDATE users SET name=?,password=?,email=?,phone=?,address=?,birthday=?,about=?,gender=? WHERE account=?",
                    [req.body.name, await bcrypt.hash(req.body.password, 10), req.body.email, req.body.phone, req.body.address, req.body.birthday, req.body.aboutme, req.body.gender, req.params.account]);
            } else {
                // 如果是空值
                let data = await connection.queryAsync("SELECT * FROM users WHERE account=?", [req.body.account]);
                let getpassword = data[0].password;
                let UpDateMemberData = await connection.queryAsync(
                    "UPDATE users SET name=?,password=?,email=?,phone=?,address=?,birthday=?,about=?,gender=? WHERE account=?",
                    [req.body.name, getpassword, req.body.email, req.body.phone, req.body.address, req.body.birthday, req.body.aboutme, req.body.gender, req.params.account]);
            }


            let newMemberData = await connection.queryAsync("SELECT * FROM users WHERE account=?", [req.body.account]);
            newMemberData = newMemberData[0];
            let returnMember = {
                account: newMemberData.account,
                email: newMemberData.email,
                name: newMemberData.name,
                phone: newMemberData.phone,
                address: newMemberData.address,
                birthday: newMemberData.birthday,
                gender: newMemberData.gender,
                aboutme: newMemberData.about,
                photo: newMemberData.photo,
                password: ""
            };
            req.session.member = returnMember;
            res.json(returnMember);
        }
        catch (e) {
            console.log({
                status: 400,
                message: " 更新會員資料失敗",
                e: e
            });
            res.json({
                status: 400,
                message: "更新會員資料請再試一試",
            });
        }
    }
    )
    .delete(async (req, res, next) => {
        try {
            let userImg = await connection.queryAsync("SELECT photo FROM users WHERE account=?", [req.params.account]);
            if (userImg[0].photo !== '') {
                // Delete from cloudinary
                await cloudinary.uploader.destroy(userImg[0].photo);
            }
            let result = await connection.queryAsync("DELETE FROM users WHERE account=?", [req.params.account]);
            res.json({ message: '刪除成功' });
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    });

//會員上傳檔案用路由中間件
router.put("/photo/:account", uploader.single("photo"), async (req, res, next) => {
    let filename = req.file.filename;
    try {
        let oldImg = await connection.queryAsync(
            "SELECT photo FROM users WHERE account=?",
            [req.params.account]
        );
        if (oldImg[0].photo !== '') {
            // Delete from cloudinary
            await cloudinary.uploader.destroy(oldImg[0].photo);
        }
        let result = await connection.queryAsync(
            "UPDATE users SET photo=? WHERE account=?",
            [[
                filename
            ], [req.params.account]]
        );
        result = await connection.queryAsync(
            "SELECT id, name, account, email, phone, address, birthday, about, gender, photo FROM users WHERE account=?",
            [req.params.account]
        );
        console.log('上傳更新成功');
        res.json(result[0]);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
}
);

// CS寫入資料庫
router.post("/CS", async (req, res, next) => {
    try {
        let result = await connection.queryAsync(
            "INSERT INTO csdata (account,email,category,memo) VALUE(?)",
            [[
                req.body.account,
                req.body.email,
                req.body.category,
                req.body.memo,
            ]]
        );
        res.json("成功");

        console.log("寫入成功");
    } catch (e) {
        console.log({
            status: 400,
            message: " 寫入資料庫失敗",
        });
        res.json({
            status: 400,
            message: "寫入失敗請再試一試",
        });
    }
});

//訂單管理
router.post("/cart", (req, res, next) => {

});

//影片收藏
router.get("/videoCollection", async (req, res, next) => {
    let result = await connection.queryAsync(
        'SELECT video_file.*, user_collection.video_id FROM video_file RIGHT JOIN user_collection ON user_collection.user_account=? WHERE user_collection.video_id=video_file.id',
        [req.session.member.account]
    );
    res.json(result);
});

//文章收藏
router.get("/articleCollection", async (req, res, next) => {
    let result = await connection.queryAsync(
        'SELECT article.*, user_collection.article_id FROM article RIGHT JOIN user_collection ON user_collection.user_account=? WHERE user_collection.article_id=article.id',
        [req.session.member.account]
    );
    res.json(result);
});



// 整個 app （整個網站）
// app.use

module.exports = router;