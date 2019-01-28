console.log('准备启动API服务器....');
console.log(new Date().toLocaleString());
const categoryRouter = require('./routes/admin/category')

// 小肥牛扫码点餐系统API子系统
const PORT =8090;
const express = require('express');
const cors = require('cors');//跨域
const table = require('./routes/admin/table');

// 启动主服务器
var app = express();
app.listen(PORT,()=>{
    console.log('API服务器启动成功...'+PORT+"....");
})

// 使用中间件 (服务器之后，挂载之前)
app.use(cors());

// 挂载路由
app.use("/admin/category",categoryRouter);