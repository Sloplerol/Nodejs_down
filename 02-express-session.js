const express = require('express');
const app = express();
// 配置session中间件
const session = require('express-session');
app.use(session({
    secret: 'user_msg',
    resave: false,
    saveUninitialized: true
}))
//往服务端里存数据

app.use(express.static('./file'));
app.use(express.urlencoded({extended:false}));
app.post('./api/login',(req,res)=>{
    if (req.body.username !== 'admin'||req.body.password!== '0000') {
        return res.send({status:0,msg:'登陆失败'});
    }
    req.session.usermsg = req.body;  //将用户信息存储到session到usermsg属性里
    req.session.islogin = true;     //用户登陆成功将状态改为true
    res.send({status:1,msg:'登陆成功'});
})
// 从服务端取数据
app.get('./api/username',(req,res)=>{
    if (!req.session.islogin) {
        return res.send({status:0,msg:'fail'})
    }
    res.send({status:1,msg:'success',username:req.session.usermsg.username})
})
// 清空session
app.post('./api/logout',(req,res)=>{
    //清空当前用户的session
    req.session.destroy();
    res.send({
        status:0,
        msg: '已清空'
    })
})
app.listen(80,()=>{
    console.log('端口已开启');
})