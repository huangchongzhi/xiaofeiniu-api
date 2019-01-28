const express=require('express');
const router=express.Router();
const pool=require("../../pool");

// 显示
router.get("/list",(req,res)=>{
    var sql="select * from xfn_table";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
// 添加
router.get("/add",(req,res)=>{
    var tname=req.query.tname;
    var type=req.query.type;
    var status=req.query.status;
    var sql="insert into xfn_table values(nuul,?,?,?)";
    pool.query(sql,[tname,type,status],(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.effectedRows>0){
            res.send({code:1,msg:"success"})
        }else{
            res.send({code:00,msg:"fail"})
        }
    })
})
// router.get("/delete",(req,res)=>{
//     var sql="select * from xfn_table";
//     pool.query(sql,(err,result)=>{
//         if(err) throw err;
//         res.send(result);
//     })
// })

// 导出
module.exports=router;