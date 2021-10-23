const express = require('express');
// { mergeParams: true } : Merge params of the routes
const router = express.Router({ mergeParams: true });

const connection = require('../utils/db');
const { SignInCheckMiddleware } = require("../middlewares/auth");

router.post('/', SignInCheckMiddleware, async (req, res, next) => {
    let videoId = req.params.id;
    let userAccount = req.session.member.account;
    // Remove HTML tags
    let commentBody = req.body.comment.replace(/<[^>]+>/g, '');
    let result = await connection.queryAsync(
        'INSERT INTO comment_video SET user_account=?, video_id=?, valid=1, content=?',
        [userAccount, videoId, commentBody]
    );
    result = await connection.queryAsync(
        'SELECT u.name as username, u.id as user_id ,c.id, c.date, c.content FROM comment_video c LEFT JOIN users u ON c.user_account=u.account WHERE c.video_id=? AND valid=1 ORDER BY c.date DESC',
        [videoId]
    );
    res.json(result);
});

router.route('/:commentId')
    .put(SignInCheckMiddleware, async (req, res, next) => {
        let { id: videoId, commentId } = req.params;
        let newComment = req.body.newComment;
        let result = await connection.queryAsync(
            'UPDATE comment_video SET content=? WHERE id=? AND video_id=?',
            [newComment, commentId, videoId]
        );
        result = await connection.queryAsync(
            'SELECT u.name as username, u.id as user_id ,c.id, c.date, c.content FROM comment_video c LEFT JOIN users u ON c.user_account=u.account WHERE c.video_id=? AND valid=1 ORDER BY c.date DESC',
            [videoId]
        );
        res.json(result);
    })

    .delete(SignInCheckMiddleware, async (req, res, next) => {
        let { id: videoId, commentId } = req.params;
        let result = await connection.queryAsync(
            'DELETE FROM comment_video WHERE id=? AND video_id=?',
            [commentId, videoId]
        );
        result = await connection.queryAsync(
            'SELECT u.name as username, u.id as user_id ,c.id, c.date, c.content FROM comment_video c LEFT JOIN users u ON c.user_account=u.account WHERE c.video_id=? AND valid=1 ORDER BY c.date DESC',
            [videoId]
        );
        res.json(result);
    });

module.exports = router;