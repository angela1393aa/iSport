const express = require('express');
const router = express.Router();
const path =require("path")
const connection = require('../utils/db');
//這是資料驗證套件
const{body,validationResult}=require("express-validator");
//資料驗證規則
const signUpRules=[
    body("email").isEmail().withMessage("Email 格式錯誤"),
    body("password").isLength({min:6}).withMessage("密碼 格式錯誤")
]
//密碼加密用
const bcrypt=require("bcrypt");
const { JsonWebTokenError } = require('jsonwebtoken');
//第三方登入驗證用
require('dotenv').config();
const passport = require('passport');

// Google 驗證註冊、登入
const GoogleTokenStrategy=require("passport-google-token").Strategy;
passport.use(
    new GoogleTokenStrategy(
        {
    clientID:process.env.GOOGOLE_ID,
    clientSecrect:process.env.GOOGLE_SECRET,
        },
        async function (accessToken,refreshToken,profile,cb){
            console.log("Google profile",profile);
            let member=await connection.queryAsync(
                "SELECT*FROM users WHERE googleid=?;",
                [profile.id]
            );
            let returnMember=null;
            //判斷註冊過
            if(member.length>0){
                member=member[0];
                returnMember={
                    id:member.id,
                    account:member.account,
                    email:member.email,
                    name:member.name,
                    phone:member.phone,
                    address:member.address,
                    birthday:member.birthday,
                    gender:member.gender,
                    aboutme:member.about,
                    photo:member.photo,
                    password:"",
                };
            }else{
                //找不到接續註冊
                let result=await connection.queryAsync(
                    "INSERT INTO users (account,email,name,photo,googleid)VALUE (?);",
                    [[
                        profile.emails[0].value,
                        profile.emails[0].value,
                        // "google login"
                        profile.displayName,
                        profile. _json.picture,
                        profile.id,
                    ],]
                )
                returnMember={
                    id:result.insertid,
                    account:profile.emails[0].value,
                    email:profile.emails[0].value,
                    name:profile.displayName,
                    photo:profile. _json.picture,
                };
            }
            cb(null,returnMember);
            }
    ))

    // google路由
    router.post(
        "/google",
        passport.authenticate("google-token",{session:false}),
        function(req,res,next){
            if(!req.user){
                console.log("Google Login 登入失敗");
                return res.json(401);
            }
            console.log("Google 登入成功");
            req.session.member=req.user;
            res.json({
                id:req.user.id,
                email:req.user.email,
                account:req.user.account,
                name:req.user.name,
                photo:req.user.photo,
            });
        }
    )

// feacebook中間件
    const FacebookTokenStrategy=require("passport-facebook-token");
    passport.use(
        new FacebookTokenStrategy(
            {
                clientID:process.env.FACEBOOK_ID,
                clientSecret:process.env.FACEBOOK_SECRET,
            },
            async function(accessToken,refreshToken,profile,cb){
                console.log("FB profile",profile);
                let member=await connection.queryAsync(
                    "SELECT * FROM users WHERE facebookid=?;",
                    [profile.id]
                );
                let returnMember=null;
                    //判斷註冊過
                if(member.length > 0) {
                    member=member[0];
                    returnMember={
                        id:member.id,
                        account:member.account,
                        email:member.email,
                        name:member.name,
                        phone:member.phone,
                        address:member.address,
                        birthday:member.birthday,
                        gender:member.gender,
                        aboutme:member.about,
                        photo:member.photo,
                        password:"",
                        };
                } else {
                    //找不到接續註冊
                    let result=await connection.queryAsync(
                    "INSERT INTO users (account,name,email,photo,facebookid) VALUES (?)",
                        [[
                        profile.emails[0].value,
                        profile.displayName,
                        profile.emails[0].value,
                        profile.photos[0].value,
                        profile.id,
                        ]]
                        );
                    returnMember={
                        id:result.insertid,
                        account:profile.emails[0].value,
                        email:profile.emails[0].value,
                        name:profile.displayName,
                        photo:profile.photos[0].value,
                    };
                    }
                    cb(null,returnMember);
                }
            )
        )

    //facebook路游
    router.post("/facebook",
    passport.authenticate("facebook-token",{session:false}),
    (req,res,next)=>{
        if (!req.user){
            console.log("FB Loogin 登入失敗");
            return res.json(401);
        }
        console.log("FB 登入成功")
        req.session.member=req.user;
        res.json({
            id:req.user.id,
            email:req.user.email,
            account:req.user.account,
            name:req.user.name,
            photo:req.user.photo,
        })
    })


// 註冊會員資料送至express 中間件寫入資料庫
router.post("/SignUp",signUpRules,async(req,res,next)=>{
    //檢查帳號是否重複
    let member =await connection.queryAsync(
        "SELECT*FROM users WHERE account=?;",
        [req.body.account]
    );
    if(member.length>0){
        return next({
            status:400,
            message:"帳號已重複",
        });
    }
    //資料驗證結果
    const validateResult=validationResult(req);
    console.log(validateResult);
    //把驗證錯誤的內容傳給前端，判斷依據，如果vaildateResult不是空的代表驗證不過，[0]表示顯示第一個錯誤給前端
    if(!validateResult.isEmpty()) {
        let error=validateResult.array();
        console.log(error);
        return res
        .status(400)
        .json({field:error[0].param,message:error[0].msg});
    }
    console.log(req.body);
    let result=await connection.queryAsync(
        "INSERT INTO users (name,account,password,email,phone,address,birthday,about,gender) VALUE(?)",
        [[
            req.body.name,
            req.body.account,
            await bcrypt.hash(req.body.password,10),
            req.body.email,
            req.body.phone,
            req.body.address,
            req.body.birthday,
            req.body.aboutme,
            req.body.gender,
        ]]
    )
    res.json({message:"註冊成功"});
});

const jwt =require("jsonwebtoken");
const { appendFile } = require('fs');

//登入路游
router.post("/Signin",async(req,res,next)=>{
    // 檢查是否有帳號
    let member =await connection.queryAsync(
        "SELECT*FROM users WHERE account=?;",
        [req.body.account]
    );
    if(member.length===0){
        return next({
            status:400,
            message:"沒有找到帳號",
        });
    }

    member=member[0];
        // 檢查密碼是否正確
        let result =await       
        bcrypt.compare(req.body.password,member.password);
        // let result=req.body.password;
        if(!result){
            return next({
                status:400,
                message:"密碼錯誤",
            });
        }
        console.log("登入成功")
    let returnMember={
        id:member.id,
        account:member.account,
        email:member.email,
        name:member.name,
        phone:member.phone,
        address:member.address,
        birthday:member.birthday,
        gender:member.gender,
        aboutme:member.about,
        photo:member.photo,
        password:"",

    };
    //這是取得會員全部資料
    // req.session.account=account;
    // 這是取得會員部分資料
    req.session.member=returnMember;
    res.json(req.session.member);
});

router.get("/logout", (req, res, next) => {
    req.session.member = null;
    res.sendStatus(202);
    console.log("登出成功")
  }
  );
  

module.exports = router;