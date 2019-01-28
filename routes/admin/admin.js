/*
* 管理员相关路由
*/
const express=require('express');
const pool=require("../../pool.js");
const router=express.Router();

/**
 * API：GET /admin/login
 * 请求数据：{aname:'xxx',apwd:'xxx'}
 * 完成用户登录验证
 * 返回数据：
 * {code:200,msg:'login succ'}
 * {code:400,msg:'aname or apwd err'}
 */
router.get("/logon",(req,res)=>{
    pool.query(url,data,callback);
})

/**
 * API：PATCH /admin/login  （put 修改全部、patch只修改部分）
 * 请求数据：{aname:'xxx',apwd:'xxx'}
 * 根据管理员名和密码修改管理员密码
 * 返回数据：
 * {code:200,msg:'login succ'}
 * {code:400,msg:'aname or apwd err'}
 */

// 导出
module.exports = router;