const e = require('express');
const mysql = require('mysql');
//建立与mysql数据库的连接
const db = mysql.createPool({
    host: '127.0.0.1', //数据库的ip地址
    user: 'root',   //登陆数据库的账号
    password: 'admin123', //mysql的密码
    database: '01_db', //要操作数据库的名字
})
// 测试mysql模块是否可以正常工作
// select1是用来判断是否能执行sql模块的
// db.query('select 1',(err,result)=>{
//     if (err) return console.log(err.message);
//     // 如果正常执行打印result结果
//     console.log(result);
// })
// const sqldb = 'select * from users';
// db.query(sqldb,(err,result)=>{
//     if(err) return console.log(err.message);
//     console.log(result);
//     //执行结果都是以数组的形式存储的对象
// })
//定义待插入的语句
// const human = {username: 'star',password: '123456'};
// //? 充当占位符好方便human插入数据
// const insql = 'insert into users (username,password) values (?,?)';
// // 可以使用数组的形式依次为占位符添加值
// db.query(insql,[human.username,human.password],(err,result)=>{
//     if(err) return console.log(err.message);
//     // 插入语句通过affectedRows来判断是否插入成功
//     // 如果响应的行数为1则代表该数据插入成功
//     else if(result.affectedRows===1) {
//         // 在这里面result是一个对象
//         console.log('插入数据成功');
//     }
// })
// const human = {username:'mmm',password: '123456'};
// // 待执行的sql语句
// const insql = 'insert into users set ?';
// // 直接将数据对象human当作占位符的值
// db.query(insql,human,(err,result)=>{
//     if(err)return console.log(err.message);
//     else if(result.affectedRows===1) {
//         console.log('插入成功');
//     }
// })
// const up10 = {username:'ldh',password:'0000',id:10};
// const upsql = 'update users set username=?,password=? where id=?';
// db.query(upsql,[up10.username,up10.password,up10.id],(err,result)=>{
//     if(err)return err.message;
//     else if(result.affectedRows===1) {
//         console.log('更新成功');
//     }
// })
// const up12 = {username: 'hill',password: '9999',id:12};
// const upsql = 'update users set ? where id=?';
// db.query(upsql,[up12,up12.id],(err,result)=>{
//     if(err) return console.log(err.message);
//     if(result.affectedRows===1) {
//         console.log('更新成功');
//     }
// })
// const del1 = 'delete from users where id=?';
// // 当只需要删除单个数据的时候不需要用对象加数组的形式去删除 
// db.query(del1,1,(err,result)=>{
//     if (err) return console.log(err.message);
//     // delete结果也是一个对象也有affecedRows属性
//     else if (result.affectedRows===1) {
//         console.log('删除成功');
//     }
// })
const upsql = 'update users set status=? where id=?';
db.query(upsql,[1,12],(err,result)=>{
    if(err) return console.log(err.message);
    if(result.affectedRows===1) {
        console.log('标记删除成功');
    }
})