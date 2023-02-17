const express = require('express');
const app = express();
const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const secretKey = '*_*';
// 定义一个密钥 密钥本质上是一个字符串
//使用这个密钥对对jwt字符进行解密
// unless指定那些接口不需要访问权限 利用正则表达式表示凡是以/api开头的都不需要访问权限
app.use(expressjwt({secret:secretKey}).unless({path:[/^\/api\//]}));
app.post('/',(req,res)=>{
    res.send({
        status: 200,
        msg: '登陆成功',
        token: jwt.sign({username:req.body.username},secretKey,{expiresIn:'30s'})
        // 三个参数分别为用户的信息 密钥 token有效期    
    })
})
app.use((err,req,res,next)=>{
    if (err.name==='UnauthorizedError') {
        //当token过期或不合法返回UnauthorizedError这类错误
        return res.send({
            status: 401,
            msg: '无效的token'
        })
    }
    res.send({
        status:500,
        msg: '未知的错误'
    })
})
app.listen(80,()=>{
    console.log('端口已启动');
})