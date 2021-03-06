/**
 * 菜品相关路由
 */
const express = require('express');
const pool = require('../../pool');
var router = express.Router();

/**
 * API: GET /admin/dish
 * 获取所有的菜品（按类别进行分类）
 * 返回数据：
 * [
 *  {cid:1, cname:'肉类', dishList:[{},{},...]},
 *  {cid:2, cname:'菜类', dishList:[{},{},...]},
 *  ...
 * ]
 */
router.get('/',(req,res)=>{
    // 为了获得所有菜品，必须下查询所有的菜品类别
    pool.query("SELECT cid,cname FROM xfn_category ORDER BY cid",(err,result)=>{
        if(err) throw err;
        // 循环遍历每个菜品类别，查询该类别下有哪些菜品
        var categoryList = result; // 菜品类别数组
        var finishCount = 0; // 已经查询完菜品的类别的数量
        for(let c of categoryList){ // let只能在内部使用，可以给每个c赋值
            pool.query("SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC",c.cid,(err,result)=>{
                if(err) throw err;
                c.dishList = result;// 给每个菜品加个列表
                // 必须保证所有的类别下的菜品都查询完成才能发送响应消息——这些查询都是异步执行的，无法保证执行效率
                finishCount++;
                // finishCount等于所有类别，每个类别都加载完
                if(finishCount==categoryList.length){
                    res.send(categoryList);
                }
            })
        }
    })
})

/**
 * API： /POST /admin/dish/image  每次上传不一样（非幂等）
 * 请求参数：{}
 * 接收客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名
 * 响应数据：
 *  {code:200, msg:'upload succ',fileName:'1351324631-8821.jpg'}
 */
// 1、下载模块 npm i multer --save
// 2、引入中间件
const multer = require('multer');
const fs = require('fs'); //文件模块
var upload = multer({
    dest:'tmp/' //制定客户端上传的文件临时存储路径
})
// 3、单个用single()、多个用array()
router.post("/image",upload.single('dishImg'),(req,res)=>{
    // console.log(req.file); //客户端上传的文件
    // console.log(req.body); //客户端随同图片提交的字符数据
    // 把客户端上传的文件从临时目录转移到永久的图片路径下
    var tmpFile = req.file.path; //临时文件名
    var suffix = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));//原始文件名中的后缀部分
    var newFile = randFileName(suffix);//目标文件名
    fs.rename(tmpFile, 'img/dish/'+newFile,()=>{
        res.send({code:200, msg:'upload succ',fileName:newFile});//把临时文件转移
    }); 
});
// 生成一个随机文件名
// 参数：suffix表示要生成的文件名中的后缀
// 形如：1351324631-8821.jpg
function randFileName(suffix){
    var time = new Date().getTime();//当前系统时间戳
    // min max:Math.random()*(max-min)+min
    var num = Math.floor(Math.random()*(10000-1000)+1000);//4位的随机数
    return time + '-' + num + suffix;
}


/**
 * API： /POST /admin/dish
 * 添加一个新的菜品
 */

module.exports = router;