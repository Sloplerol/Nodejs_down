const express = require('express');
const diy = require('./自定义中间件');
const app = express();
// 将自定义的中间件注册为全局可用的中间件
app.use(diy);
app.post('/post',(req,res)=>{ 
    res.send(req.fuck);
})
app.listen(80,()=>{
    console.log('端口已启动');
})