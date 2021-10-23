const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get('/chatRoom', async (req, res, next) => {
    let result = await connection.queryAsync(
        "SELECT id, name FROM category WHERE valid=1"
    );
    res.json(result);
});

router.get('/videoTag', async (req, res, next) => {
    let result = await connection.queryAsync(
        "SELECT v.id, t.tag_id as tag, v.title, v.filePath, v.description, v.duration, v.upload_date, v.views, v.likes FROM video_file v LEFT JOIN video_tag t ON v.id=t.video_id WHERE v.valid=1"
    );
    result.map(
        (video) =>
        (video.upload_date = video.upload_date
            // .toISOString()
            .slice(0, 16)
            .replace(/:/gi, "")
            .replace("T", ""))
    );
    res.json(result);
});

module.exports = router;