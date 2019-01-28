const express=require('express');
const router=express.Router();
const pool=require("../../pool.js");

// 菜品类别相关的路由

/**
 * API GET /admin/category
 * 含义：客户端获取所有的菜品类别，按编号升序排列
 * 返回值 形如：
 * [{cid:1,cname:'..'},{...}]
 */
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM xfn_category order by cid',(err,result)=>{
        if(err) throw err;
        res.send(result);// json格式

        // jsonp 方式
        // <script src='http://127.0.0.1:8090/admin/category'></script>// 返回格式：doData([{},{},{}])
        // var jsonData = JSON.stringify(result);
        // res.send('doData('+jsonData+')')
    })
})

/**
 * API DELETE /admin/category  (通过合理的请求方法，叫做RESTful API)
 * 含义：根据路由参数表示菜品编号的路由参数，删除该菜品
 * 返回值 形如：
 * {code:200,msg:'1 category deleted'}
 * {code:400,msg:'0 category deleted'}
 */
router.delete('/:cid',(req,res)=>{
    // pool.query(sql语句,参数,回调函数)
    pool.query("DELETE FROM xfn_category WHERE cid=?",req.params.cid,(err,result)=>{
        if(err) throw err;
        // 获取DELETE语句在数据库中影响的行数
        if(result.affectedRows > 0){
            res.send({code:200,msg:'1 category deleted'});
        }else{
            res.send({code:400,msg:'0 category deleted'});
        }
    })
})

/**
 * API PUT /admin/category
 * 请求参数：{cid:xx,cname:'xxx'}
 * 含义：根据菜品编号修改该类别
 * 返回值 形如：
 * {code:200,msg:'1 category modified',cid:x}
 * {code:400,msg:'0 category modified,not exists',cid:x} 类别不存在
 * {code:401,msg:'0 category modified,no modification',cid:x} 类别存在，成功修改，但
 */

module.exports=router;