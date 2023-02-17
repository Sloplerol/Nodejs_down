const express = require('express');
const app = express();
app.get('/api/jsonp',(req,res)=>{
    const funcname = req.query.callback;
    const data = {uname:'zjj',age:24};
    const scriptStr = `${funcname}(${JSON.stringify(data)})`;
    res.send(scriptStr);
})
app.listen(80,()=>{
    console.log('端口已启动');
})