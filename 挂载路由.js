const express = require('express');
const router = express.Router();
router.get('/get',(req,res)=>{
    // 通过查询字符串的方法 拿到客户端的发送的数据
    res.setHeader('Access-Control-Allow-Origin','*');
    const query = req.query;
    res.send({
        status: 0,
        mag: 'get请求成功',
        data: query
    })
    
})
router.post('/post',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    const body = req.body;
    res.send({
        status:0,
        msg: 'post请求成功',
        data: body
    })
})
module.exports = router;