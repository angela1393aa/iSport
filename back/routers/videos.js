const express = require("express");
const router = express.Router();

const connection = require("../utils/db");
const { SignInCheckMiddleware } = require("../middlewares/auth");

router.route("/").get(async (req, res, next) => {
    let result = await connection.queryAsync(
        "SELECT * FROM video_file WHERE valid=1 ORDER BY views DESC"
    );
    result.map(
        (video) =>
        (video.upload_date = video.upload_date
            .slice(0, 16)
            .replace(/:/gi, "")
            .replace("T", ""))
    );
    res.json(result);
});

router.route("/category").get(async (req, res, next) => {
    let result = await connection.queryAsync(
        "SELECT id, name FROM category WHERE valid=1"
    );
    res.json(result);
});

router.route("/suggestVideos").get(async (req, res, next) => {
    let result = await connection.queryAsync(
        "SELECT id, title, filePath, views, upload_date, likes FROM video_file ORDER BY RAND() LIMIT 5"
    );
    res.json(result);
});

router.route("/suggestArticles").get(async (req, res, next) => {
    let result = await connection.queryAsync(
        "SELECT id, user_name, title, views, upload_date FROM article ORDER BY RAND() LIMIT 5"
    );
    res.json(result);
});

router
    .route("/:id")
    .get(async (req, res, next) => {
        let videoId = req.params.id;
        let wasLiked = false;
        let wasCollected = false;
        if (req.session.member) {
            let userAccount = req.session.member.account;
            let result = await connection.queryAsync(
                "SELECT * FROM user_like WHERE user_account=? AND video_id=?",
                [userAccount, videoId]
            );
            result.length > 0 ? (wasLiked = true) : (wasLiked = false);
            result = await connection.queryAsync(
                "SELECT * FROM user_collection WHERE user_account=? AND video_id=?",
                [userAccount, videoId]
            );
            result.length > 0 ? (wasCollected = true) : (wasCollected = false);
        }

        let result = await connection.queryAsync(
            "UPDATE video_file SET views=views+1 WHERE id=?",
            [videoId]
        );
        result = await connection.queryAsync(
            "SELECT * FROM video_file WHERE id=? AND valid=1",
            [videoId]
        );
        let commentResult = await connection.queryAsync(
            "SELECT u.name as username, u.id as user_id ,c.id, c.date, c.content FROM comment_video c LEFT JOIN users u ON c.user_account=u.account WHERE c.video_id=? AND valid=1 ORDER BY c.date DESC",
            [videoId]
        );
        result[0].wasLiked = wasLiked;
        result[0].wasCollected = wasCollected;
        result[0].comment = commentResult;
        res.json(result[0]);
    })
    .patch(SignInCheckMiddleware, async (req, res, next) => {
        let videoId = req.params.id;
        let userAccount = req.session.member.account;

        // Handle Like Button
        if (req.body.like) {
            if (req.body.like === "dislike") {
                let result = await connection.queryAsync(
                    "DELETE FROM user_like WHERE user_account=? AND video_id=?",
                    [userAccount, videoId]
                );
                result = await connection.queryAsync(
                    "UPDATE video_file SET likes=likes-1 WHERE id=?",
                    [videoId]
                );
                res.json(result.affectedRows);
            } else {
                let result = await connection.queryAsync(
                    "INSERT INTO user_like SET user_account=?, video_id=?",
                    [userAccount, videoId]
                );
                result = await connection.queryAsync(
                    "UPDATE video_file SET likes=likes+1 WHERE id=?",
                    [videoId]
                );
                res.json(result.affectedRows);
            }
        }

        // Handle Collection Button
        if (req.body.collect) {
            if (req.body.collect === "removeCollection") {
                let result = await connection.queryAsync(
                    "DELETE FROM user_collection WHERE user_account=? AND video_id=?",
                    [userAccount, videoId]
                );
                res.json(result.affectedRows);
            } else {
                let result = await connection.queryAsync(
                    "INSERT INTO user_collection SET user_account=?, video_id=?",
                    [userAccount, videoId]
                );
                res.json(result.affectedRows);
            }
        }
    });

module.exports = router;
