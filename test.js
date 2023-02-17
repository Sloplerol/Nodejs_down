const express = require('express');
const app = express();
// 配置session中间件
const session = require('express-session');
app.use(session({
    secret: 'random',
    resave: false,
    saveUninitialized: true
}))
app.use(express.static('./pages'));
app.use(express.urlencoded({extended:false}));
// 存储数据
app.post('/api/login',(req,res)=>{
    // 判断用户输入的数据是否正确
    if(req.body.username!=='admin'||req.body.password!=='12345') {
        return res.send({status:1,msg:'登陆失败'});
    }
    // req.session是用来存储用户信息的
    req.session.user = req.body;
    req.session.islogin = true;
    res.send({status:0,msg:'登陆成功'});
})
// 取数据
app.get('/api/username',(req,res)=>{
    if(!req.session.islogin) {
        return res.send({status:1,msg:'fail'});
    }
    res.send({
        status:0,
        msg: 'success',
        username: req.session.user.username 
    })
})
//清除数据
app.post('/api/logout',(req,res)=>{
    // 清空所在客户端的session信息
    req.session.destroy();
    res.send({
        status:0,
        msg: '退出登陆成功'
    })
})
app.listen(80,()=>{
    console.log('端口已启动');
})