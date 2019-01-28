
// mysql 数据库连接池

const mysql=require("mysql");
var pool=mysql.createPool({
   host:"127.0.0.1",   //数据库的地址
   user:"root",        //数据库管理员
   port:'3306',         //数据库端口号
   password:'',         //数据库管理员密码
   database:"xiaofeiniu",     //默认连接的数据库
   connectionLimit:10         //连接池中连接数量
});
module.exports=pool;