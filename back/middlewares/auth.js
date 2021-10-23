const jtw = require("jsonwebtoken");

// 登入確認權限自訂中間件
module.exports = {
  SignInCheckMiddleware: function (req, res, next) {
    //jwt用
    // const rawtoken=reeq.header("Authorization");
    // const token=rawToken.replace("Bearer ","");
    // try{
    //             // 解簽  jwt用
    //     const data=jwt.verify(token,process.env.JWT_SECRET);
    //     req.member=data;
    //     next();
    // }catch(e){
    //         return next({
    //             status:401,
    //             mseeage:"請先登入會員",
    //         });
    //     }
    //  FIXME: 暫時關閉身份驗證
    //  這是witchcreadition的身分驗證
    if (!req.session.member) {
      return next({
        status: 401,
        mseeage: "請先登入會員",
      });
    } else {
      next();
      console.log("通過驗證");
    }
  },
};
