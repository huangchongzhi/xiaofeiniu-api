console.log('准备启动API服务器....');
console.log(new Date().toLocaleString());

// 引入路由
const categoryRouter = require('./routes/admin/category');
const adminRouter = require('./routes/admin/admin');
const dishRouter = require('./routes/admin/dish');

// 小肥牛扫码点餐系统API子系统
const PORT =8090;
const express = require('express');
const cors = require('cors');//跨域
const bodyParser = require('body-parser')

// 启动主服务器
var app = express();
app.listen(PORT,()=>{
    console.log('API服务器启动成功...'+PORT+"....");
})

// 使用中间件 (服务器之后，挂载之前)
app.use(cors());
// app.use(bodyParser.urlencoded({extended:false}));// 把application/x-www-form-urlencoded格式的请求主体数据解析出来放入req.body属性
app.use(bodyParser.json());// 把application/json格式的请求主体解析出来放入req.body属性

// 挂载路由
app.use("/admin/category",categoryRouter);
app.use("/admin",adminRouter);
app.use("/admin/dish",dishRouter);