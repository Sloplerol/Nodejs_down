const qs = require('querystring');
const fn = (req,res,next)=>{
    let str = '';
    req.on('data',(chunk)=>{
        // data事件是用来对客户端发送到服务端的字符进行拼接
        str+=chunk;
    })
    req.on('end',()=>{
        // end事件代表了数据全部接收完毕
        // console.log(str);
        // querystring解析字符串为对象
        const body = qs.parse(str);
        req.fuck = body;
        // 将对象挂载到req.body上供下游使用
        next();
    })
    
}
module.exports = fn;