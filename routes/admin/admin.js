/*
* 管理员相关路由
*/
const express=require('express');
const pool=require("../../pool.js");
const router=express.Router();

/**
 * API：GET /admin/login
 * 请求数据：{aname:'xxx',apwd:'xxx'}
 * 返回数据：
 * {code:200,msg:'login succ'}
 * {code:400,msg:'aname or apwd err'}
 */
router.get("/logon",(req,res)=>{
    pool.query(url,data,callback);
})

// 导出
module.exports = router;