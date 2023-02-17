const express = require('express');
const app = express();
app.use(express.urlencoded({extended:false}));
const router = require('./挂载路由');
app.use('/api',router);
app.listen(80,()=>{
    console.log('端口已启动');
})
