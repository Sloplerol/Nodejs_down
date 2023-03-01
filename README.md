## Node.js,web包管理,mysql数据的基本使用

### 前言

> **本文章为自学整理的笔记 **
>
> **如想观看视频学习,或者是视频中哪部分没有听明白可以参考一下本篇笔记**
>
> 第一次写这么大规模的笔记可能有些地方写错了或者是没写明白 忘指正勿喷谢谢🫡

[视频入口]('https://www.bilibili.com/video/BV1a34y167AZ?p=1&vd_source=e9bfdb3098ad69cc5bdc6786ce0ecb4c')

> 运行环境

* 浏览器(前端开发)

    * > 内置DOM和BOM和AJAX API 通过js代码操控API 再通过内置v8解析引擎(chrome) 解析js代码  
        >
        > > API 只能在运行环境中进行调用

* Node.js(后端开发)

    * 概念:Nodejs是基于v8引擎的js运行环境

        >  解析流程和前端相似 也是js代码操控后端API v8引擎解析js代码
        >
        >  > Nodejs不能使用DOM和BOM API   

1. Node.js的使用

    * 官方下载 terminal查看node版本 
        * node -v
    * 如何在node js环境下执行js代码
        * cd到js代码当前到目录下
        * node 当前js文件 ex:node hello.c
        * 快捷键
            1. 上箭头 快速粘贴上一次node代码
            2. tab键 当node的文件名很长的话 采取方法:node 该文件首字母,再按下tab键就能实现自动补齐文本名的作用
            3. 清除当前已输入的node命令
                * Mac：esc加回车全部清除
                * Window esc
            4. 清空终端屏幕
                * Mac: Ctrl+Cmd+L（清除屏幕） ，Cmd+K（清除到开头），Clear ，Ctrl+L 
                * window: cls

2. fs文件系统模块(Node.js官方提供)

    > 引入fs模块方法 `const fs = require('fs');`

    * 读取文件方法 fs.readfile()

        > 读取文件格式: fs.readfile(path,[option],callback) []代表可选参数
        >
        > > Path: 读取文件路径     option:可选项代表以什么编码格式进行读取默认情况下为utf-8     callback:回调函数通过回调函数拿到读取的结果 callback参数一定要先搞清楚顺序不要写反造成意外结果

        **代码如下** 

        1. 成功读取文件的结果 

            ```
            1. fs.readFile('./file/hello.txt','utf-8',function(*err*,*dataStr*){
            
            ​    console.log(*err*); //失败返回的结果 如果读取成功err返回的值是null
            
            ​    console.log(*dataStr*); //成功返回的结果 hello world
            
            })
            ```

        2. 失败读取文件的结果 

            ```
            const fs = require('fs');
            
            fs.readFile('./file/hello1.txt','utf-8',function(*err*,*dataStr*){
            
               console.log(*err*); //Error:
            
               console.log(*dataStr*); //undefined
            
            })
            ```

            

        3. 通过以上两点可以通过err结果判断是否读取成与败

            ```
            const fs = require('fs');
            
            fs.readFile('./file/hello1.txt','utf-8',function(*err*,*dataStr*){
            
                if (*err*) {
                    return console.log('文件读入失败，文件的输出结果是'+*err*.message);
                }
                return console.log('文件读取成功，文件的输出结果是'+ *dataStr*);
            
            })
            ```

    * 写入文件方法 fs.writefile()

        > 写入文件格式: fs.readfile(path,data,[option],callback)
        >
        > > Path: 路径       data:写入内容       option:以什么编码格式写入       callback:回调函数

        **代码如下**

        1.成功写入文件 

        ```
        const fs = require('fs');
        
        fs.writeFile('./file/hello2.txt','made in heaven',function(*err*){
        
            console.log(*err*); //返回结果为null并且会新创建一个hello2文件
        
        })
        ```

        2.失败写入文件 

        ```
        const fs = require('fs');
        
        fs.writeFile('../file/hello2.txt','made in heaven',function(*err*){
        
            console.log(*err*); //Error抛出错误对象
        
        })
        ```

        3.和写入数据同理通过err返回是否为null判断是否写入成功

        const fs = require('fs');

        ```
        fs.writeFile('../file/hello2.txt','made in heaven',function(*err*){
        
        ​    if (*err*) {
        
        ​        return console.log('写入成功');
        
        ​    }
        
        ​    return console.log('写入失败');
        
        })
        ```

    * 录取成绩案例巩固 将hello3.txt文件内容抽取出来并以换行的格式呈现并写入一个空文档中

        ```
        a=10 b=20 c=30
        
        const fs = require('fs');
        
        fs.readFile('./file/hello3.txt','utf-8',function(*err*,*dataStr*){
        
        ​    if (*err*) {
        
        ​        return console.log('读取失败');
        
        ​    }
        
        ​    const preres = *dataStr*.split(' ');
        
        ​    const nowres = [];
        
        ​    preres.forEach((*items*)=>{
        
        ​        nowres.push(*items*.replace('=',':'));
        
        ​    })
        
        ​    const newres = nowres.join('\n');
        
        ​    fs.writeFile('./file/hello4.txt',newres,function(*err*){
        
        ​        if (*err*) {
        
        ​            return console.log('写入失败');
        
        ​        }
        
        ​        console.log('成绩写入成功');
        
        ​    })
        
        })
        ```

    * 路径动态拼接问题(./  ../)

    ```
    const fs = require('fs');
    
    fs.readFile('./file/hello.txt',function(*err*,*dataStr*){
    
    ​    if(*err*) {
    
    ​        return console.log('error');
    
    ​    }
    
    ​    console.log('success');
    
    })
    ```

    * 问题出错源

        * 正常来说你需要cd到当前目录 读取数据也是在当前目录(content)下的./file/hello.txt也就是路径拼接
        * 如果返回到上一级目录 你想要读取hello.txt 那么你可能会写node ./content/file/hello.txt 这时就会报错
        * 因为node会以你当前目录去拼接读取的相对文件路径也就是    ./当前目录/file/hello.txt

    * 如何解决

        * 归根到底还是出在了你书写js代码是设置的相对路径 如果你想要解决将js代码里的路径改为绝对路径即可 vscode可以直接复制你想要的绝对路径

        * 缺点: 移植性性差 不利于后期维护 也就是当你更改当前文件目录后期可能读取不到该文件

        * 如果想要根治需要使用__dirname获取当前文件所处的目录不包含该文件

            ```
            const fs = require('fs');
            
            fs.readFile(__dirname+'/file/hello.txt',function(*err*,*dataStr*){
            
            ​    if (*err*) {
            
            ​        return console.log('读取失败');
            
            ​    }
            
            ​    console.log('读取成功');
            
            })
            ```

        * 见如上代码 __dirname已经将当前目录锁定为file的上一级目录,只需要你node到file的上一级目录就可以

        * 总结:在没有dirname时路径为动态的      而当你设置__dirname将目标路径定死

3. path路径模块

    > 引入path模块 const path = require('path');

    * 拼接路径片段 path.join(' ')

        * 在拼接路径片段的时候../有抵消上一级路径的效果

            ```
            Ex: const path = require('path');
            
            const result = path.join('/a','/b','/c/d','../','f');
            
            console.log(result); //返回结果为/a/b/c/f
            ```

            **建议以后对路径进行拼接时不要去使用 +    看着比较不美观也会出现一些问题**

            ```
            const fs = require('fs');
            
            const path = require('path');
            
            fs.readFile(path.join(__dirname,'/file/hello.txt'),function(*err*,*dataStr*){
            
            ​    if (*err*) {
            
            ​        return console.log('读取失败');
            
            ​    }
            
            ​    console.log('读取成功');
            
            })
            ```

            * 问题出错点

                > 如果用的是刚才的加号 后面拼接的路径改为./file.hello.txt 会报错因为如果加了点相当于在__dirname固定住的路径后面加上一个点再加上后面拼接的路径肯定出问题 而path模块完美的避免了该问题

    * 获取路径中部分的文件名 path.basename(' ')

        * 代码示范

            ```
            当basename参数为1个的话
            
            const path = require('path');
            
            const lastpath = path.basename('a/b/c/index.html');
            
            console.log(lastpath); 
            
            //返回结果为index.html
            
            当basename参数为两个的时候
            
            const delpath = path.basename('a/b/c/index.html','.html');
            
            console.log(delpath); 
            
            //返回结果为index     也就是第二个参数决定你要删除最后一个路径的哪个字母    后期主要是用来删除扩展名
            ```

            

    * 获取文件扩展名 path.extname(' ')

        * 代码示范

            ```
            const path = require('path');
            
            const npath = '/a/b/c/index.html';
            
            const houzhui = path.extname(npath);
            
            console.log(houzhui); 
            
            //返回值为.html
            ```

    * 利用正则表达式将html页面的js和css标签元素进行分离,并将html的css部分和js部分替换为外链的形式写入html最后分离出三个有联系的html css 和js文件

        * 首先我们需要将js css正则匹配文件写好  代码如下

            > const regCSS = /<style>[\s\S]*<\/style>/;
            >
            > const regJS = /<script>[\s\S]*<\/script>/;

        * 读取代码成功将其写入代码

            ```
            fs.readFile(path.join(__dirname,'index.html'),function(*err*,*dataStr*){
            
            ​    if(*err*) {
            
            ​        return console.log('读取失败');
            
            ​    }
            
            ​    *// 当读取成功可以解析html  css js代码*
            
            ​    resolveCSS(*dataStr*);
            
            ​    resolveJS(*dataStr*);
            
            })
            ```

        * resolvecss部分   正则表达式exec目的是去匹配datastr里的元素  如果匹配失败,exec()方法返回null 完全匹配成功的文本将作为返回数组的第一项 [详见]('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec')

            ```
            function resolveCSS(*htmlStr*){
            
            ​    *// 使用正则表达式把dataStr里的元素以数组的形式进行存储 style部分为首位*
            
            ​    const r1 = regCSS.exec(*htmlStr*);
            
            ​    *// 将css部分的style标签去掉*
            
            ​    const newstyle = r1[0].replace('<style>','').replace('</style>','');
            
            ​    *// console.log(newstyle);*
            
            ​    fs.writeFile(path.join(__dirname,'./file/index.css'),newstyle,function(*err*){
            
            ​        if (*err*) {
            
            ​            console.log('写入失败');
            
            ​        }
            
            ​        console.log('css写入成功');
            
            ​    })
            
            ​    
            
            }
            ```

        * resolvejs部分

            ```
            function resolveJS(*htmlStr*) {
            
            ​    *// 此时js部分为首位,因为regJS就是先匹配script标签在去生成其他元素*
            
            ​    const j1 = regJS.exec(*htmlStr*);
            
            ​    *// console.log(j1);*
            
            ​    const newjs = j1[0].replace('<script>','').replace('</script>','');
            
            ​    fs.writeFile(path.join(__dirname,'./file/index.js'),newjs,function(*err*){
            
            ​        if (*err*) {
            
            ​            console.log('写入失败');
            
            ​        }
            
            ​        console.log('js写入成功');
            
            ​    })
            
            }
            ```

        * resolvehtml部分

            ```
            function resolveHTML(*htmlStr*) {
            
            ​    const newhtml = *htmlStr*.replace(regCSS,'<link rel="stylesheet" href="./index1.css">').replace(regJS,'<script src="./index1.js"></script>');
            
            ​    fs.writeFile(path.join(__dirname,'./file/index1.html'),newhtml,function(*err*){
            
            ​        if (*err*) {
            
            ​            return console.log('写入失败');
            
            ​        }
            
            ​        console.log('html写入成功');
            
            ​    })
            
            }
            ```

        * 总结

            * fs.writeFIle不会创建文件夹
            * 当重写writeFile里的内容时新内容会覆盖旧的内容

4. http模块(直接在vscode里启动终端好方便操作)

    > 引入http模块  const http = require('http');

    * 概念

        * 客户端服务端的概念

            * 客户端: 负责消费资源的电脑
            * 服务端: 负责对外提供网络资源

        * http带来的好处

            * http模块是用来创建web服务器

            * 服务器和普通电脑的区别: 服务器上安装了提供web服务的一些软件

            * Node.js提供http模块可以通过代码实现一个服务器软件

        * IP地址

            * ip地址相当于家庭住址 别人通过这个ip来访问到你
            * 每一个网页都有自己的ip地址   我们可以终端ping这个网页的地址 通过ip来访问
            * 当你想访问在客户端开启的web服务 可以通过访问127.0.0.1给个人使用

        * 域名和域名服务器

            * 域名:  因为ip地址难记 用域名辅助访问        127.0.0.1的域名是localhost

            * 域名服务器(DNS):  ip和域名是对应的关系 这种关系存放到的服务器就是域名服务器

                > 域名服务器就是提供ip和域名互相转化的服务器

        * 端口号

            * 一个服务器包含无数个web服务   一个web服务对应一个端口号
            * 用户发送请求通过端口号准确定位到对应的web服务
            * URL上的80端口号可以被省略

    * 创建web服务器

        * 导入http模块

            `const http = require('http');`

        * 创建web服务器实例化对象

            `const server = http.createServer();`

        * 绑定request事件

            ```
            server.on('request',(*req*,*res*)=>{
            
            ​    *// 监听客户端需求*
            
            ​    *// 当你做出请求时就会触发request事件事件 执行回调函数*
            
            ​    console.log('welcome to my personal server');
            
            })
            ```

        * 启动服务器

            ```
            server.listen(8000,()=>{
            
            ​    *// 当启动服务器后立刻执行回调函数*
            
            ​    console.log('8000端口已启动');
            
            })
            ```

    * req请求对象 (因为没有服务端做出响应所以请求失败)

        * 包含的是与客户端相关的数据与属性
        * 方法
            * req.url    客户端请求的url:返回的值是请求端口号后面的url地址
            * req.method    客户端请求url的方法get还是post等等  默认情况下都是get请求

    * res响应对象

        * 包含的是与服务端相关的数据与属性

        * 方法

            * res.end()      向客户端响应指定内容并终止本次请求的全过程  往当前url里添加参数页面返回的结果也一样

                ```
                server.on('request',(*req*,*res*)=>{
                
                ​        *res*.end('hello neighbour');  // 如果你输入的是中文会出现乱码的情况
                
                ​		//调用res.setHeader()方法 设置响应头来解决乱码问题
                
                ​		    *res*.setHeader('Content-Type','text/html;charset=utf-8')     //text/html和charset间是引号
                
                ​		//Content-Type是规定编码类型    charset设置编码类型
                
                })
                ```

    * 不同url响应不同页面练习

        * 案例核心url后加index.html访问主页nav.html访问导航栏

            ```
            const http = require('http');
            
            const server = http.createServer();
            
            server.on('request',(*req*,*res*)=>{
            
            ​    const url = *req*.url;
            
            ​	let content = '<h2>404NOFOUND</h2>';   //在没有找到与之匹配的页面时返回该结果
            
            ​    if (url==='/' || url==='/index.html') {
            
            ​        content = '<h2>首页</h2>';
            
            ​    }else if (url==='/nav.html') {
            
            ​        content = '<h2>导航栏</h2>';
            
            ​    }
            
            ​    *res*.setHeader('Content-Type','text/html;charset=utf-8');
            
            ​    *res*.end(content);
            
            })
            
            server.listen(80,()=>{
            
            ​    console.log('服务已启动');
            
            })
            ```

    * 时钟web服务器案例

        * 核心思路 将文件的存放路径作为url请求地址    前提:想要访问当前根目录下文件夹里的文件

        * 代码如下

            ```
            const http = require('http');
            
            const fs = require('fs');
            
            const path = require('path');
            
            const server = http.createServer();
            
            server.on('request',(*req*,*res*)=>{
            
            ​    const url = *req*.url;
            
            ​    const nurl = path.join(__dirname,url);   //将根目录和请求的url参数进行拼接(核心步骤)
            
            ​    res*.setHeader('Content-Type','text/html;charset=utf-8'); //设置响应头解决乱码问题
            
            ​    fs.readFile(nurl,'utf-8',function(*err*,*dataStr*){
            
            ​        if(*err*) {
            
            ​            return *res*.end('启动失败');
            
            ​        }
            
            ​        *res*.end(*dataStr*);
            
            ​    })
            
            })
            
            server.listen(80,()=>{
            
            ​    console.log('启动成功');
            
            })
            ```

        * 如果想要优化请求路径

            ```
            let nurl = '';  //设置一个空的待会要返回的路径
            
            ​    const url = *req*.url; 
            
            ​    if (url==='/') {
            
            ​        nurl = path.join(__dirname,'./clock/index1.html'); 当没有输入url参数的时候默认情况下已经读取html文件
            
            ​    }else {
            
            ​        nurl = path.join(__dirname,'./clock',url);     当输入参数默认情况下已经添加了/clock路径
            
            ​    }
            ```

5. 模块化

    * 概念: 将一个大文件拆分为多个独立并相互依赖小文件

        * 好处
            * 提高代码的复用性
            * 提高代码的可维护性
            * 可以实现按需加载
        * 模块化规范
            * 遵循规则一致
            * 方便各个模块之间相互调用

    * Nodejs模块化

        * 内置模块: nodejs自带的模块

            > ex : fs   http    path

        * 自定义模块: 自己写的js代码

            > const m1 = require('./custom.js');   //加载custom.js自定义模块的同时并执行里面的内容  custom有无后缀名都可以,node会帮你补充js后缀

        * 第三方模块: 需要第三方下载

    * 模块作用域

        * 概念: 在模块内定义的成员无法被外界访问到

            > const m1 = require('./custom');
            >
            > console.log(m1);

            如上代码打印出来的m1是一个空对象 是因为有模块作用域的存在 而不是custom没有内容

            >  好处: 避免了全局作用域污染的问题

        * module对象

            * 打印module代码如下 存储了当前和当前模块有关的信息 

                ```
                Module {
                  id: '.',
                  path: '/Users/satrol_/JS chapter/Nodejs',
                  exports: {},  //可以通过export属性来实现共享模块作用域
                  filename: '/Users/satrol_/JS chapter/Nodejs/module共享模块作用域.js',
                  loaded: false,
                  children: [],
                  paths: [
                    '/Users/satrol_/JS chapter/Nodejs/node_modules',
                    '/Users/satrol_/JS chapter/node_modules',
                    '/Users/satrol_/node_modules',
                    '/Users/node_modules',
                    '/node_modules'
                  ]
                }
                ```

            * module.exports()向外界共享的内部对象就是 require当前自定义模块得到的结果

                * 代码示范   分别向空对象内添加username和fn属性

                    ```
                    * module.exports.username = 'gbl';
                    
                        module.exports.fn = function(){
                    
                        ​    console.log('hello world');
                    
                        }`
                    
                        打印结果为`{ username: 'gbl', fn: [Function (anonymous)] }`
                    
                    * 注意点 require导入的结果永远都以module.export指向的对象为主
                    
                        * 代码示范 在刚才导入的属性的基础上创建了一个新对象      并将module.export指向了该新对象
                    
                        `module.exports.username = 'gbl';
                    
                        module.exports.fn = function(){
                    
                        ​    console.log('hello world');
                    
                        }
                    
                        module.exports = {
                    
                        ​    username: 'abcde',
                    
                        ​    fn(){
                    
                        ​        console.log('我是新对象');
                    
                        ​    }
                    
                        }
                    ```

            * exports和module.exports指向的是同一个对象 exports是简化版

                > 但是最终共享的结果都是以module.exports所指的对象共享

                *将上面的module.exports修改成exports打印的结果一样*

            * 使用误区

                * 当同时存在export和module.export时得到的永远都是以module.export指向的对象为主  **前提是其中一个创建了一个新对象**

                    ```
                    module.exports.username = 'me';
                    
                    module.exports.age = 18;
                    
                    exports = {
                    
                    ​    rname: 'you',
                    
                    ​    age:20
                    
                    }
                    ```

                    得到的结果为{username: 'me',age: 18};

                * 当没有以上前提的情况下且属性值不发生冲突则最终两个都指向

                    ```
                    module.exports.age = 14;
                    
                    exports.rname = 'abcd';`
                    ```

                    输出结果为{age:  14,rname:  'abcd'}

                * 将其中一个的指向赋值给另一个

                    ```
                    exports = {
                    
                    ​    age: 29,
                    
                    ​    rname: 'asdj'
                    
                    }
                    
                    module.exports = exports;
                    
                    module.exports.sex = 'male';
                    ```

                    最终输出结果为{age:29,rname:'asdj',sex:'male'}

                * 建议在使用自定义模块的时候不要同时使用exports和module.exports

            * 总结

                **require()得到的永远都是module.exports指向的对象**

        * Node.js模块化规范

            * Node.js遵循CommonJS模块化规范
                * CommonJS规定
                    1. 每隔模块内部module指的是当前模块
                    2. module的exports属性是对外的接口
                    3. 加载模块加载的是module.export属性 require()用于加载模块

    * npm与包

        * 包的概念: 由第三方个人或团队开发出来的 Nodejs的包都是开源免费的

            > 包是由内置模块封装出来的     关系好比jQuery和浏览器内置API

            * npm ink公司既提供

                1. [网站]('https://www.npmjs.com/') 用来检索包的

                2. 服务器 用来下载包的

                    * 下载时通过npm包管理工具下载 
                    * Nodejs下载的时候里面就有npm管理工具可以在终端输入npm -v查看有没有

                3. 格式化时间案例

                    * 传统方法

                        * 自定义模块

                            ```
                            const dt = new Date();
                            
                            function getTime(){
                            
                               const yy = dt.getFullYear();
                            
                               const mm = buling(dt.getMonth()+1);
                            
                               const dd = buling(dt.getDay());
                            
                               const h = buling(dt.getHours());
                            
                               const m = buling(dt .getMinutes());
                            
                               const s = buling(dt.getSeconds());
                            
                               return `${yy}-${mm}-${dd}-${h}-${m}-${s}`;
                            
                               *// 封装函数获取当今时间*
                            
                            }
                            
                            function buling(*n*){
                            
                               return *n*>9 ? *n* : '0'+*n*;*//补零操作*
                            
                            }
                            
                            module.exports = {
                            
                               *// 向外共享接口*
                            
                               getTime
                            
                            }
                            ```

                            

                        * 外部引用模块

                            ```
                            *// 引入时间模块*
                            
                            const time = require('./14-格式化时间');
                            
                            const ntime = new Date();
                            
                            *// 对时间进行格式化*
                            
                            const format = time.getTime(ntime);
                            
                            console.log(format);
                            ```

                    * npm装moment包实现初始化

                        * 如何装包: 在vscode终端里输入npm i moment

                        * 代码      [参考moment方法]('https://momentjs.com/docs/')

                            ```
                            const moment = require('moment');
                            
                            const format = moment().format('YYYY-MM-DD HH:mm:ss'); 
                            
                             *// moment()获取当前时间 format()对当前时间进行初始化*
                            
                            console.log(format);
                            ```

                4. 装包注意点   **不要随意修改包内容**

                    * node_module存放所有已安装好的包
                    * package_json记录每一个包的下载信息

                5. 安装指定版本的包

                    * 默认情况下安装的都是最新的包

                    * 安装指定版本的包 

                        >  npm i moment@版本号

                    * 不用删除原来的版本

                6. 包版本解析 ex: 2.92.2

                    * 第一个2 是大版本号

                    * 第二个92是指功能版本

                    * 第三个2是指Bug修复版本

                        > 版本号提升规则: 当前一个版本号发生改变其后面的版本全部归0
                        >
                        > 例如: 假如现在是3大版本后面的两个版本都变0      假如功能版本加一那么bug修复版本变为0

                7. 包管理配置文件package.json

                    * 交代项目的版本号 名称 描述

                    * 项目用到哪些包哪些包开发期间使用

                    * 哪些包开发并部署时使用

                    * 注意点: 开发时一定要将node_module放到github的.gitignore忽略文件里

                    * 快速创建package.json    npm init -y

                        > 项目文件夹一定不要有中文和空格

                    * dependencies节点

                        * 默认情况下没有该节点

                        * 作用: 用来记录你之前安装了哪些包

                        * 属性名为包的名字 属性值为包的版本

                        * 安装多个包

                            > npm i 第一个包空格第二个包

                        * 安装所有包(所有指的是读取到dependencies节点里的所有包)

                            > npm i

                        * 卸载包

                            > npm uninstall 包名

                    * devDependencies

                        * 记录某些只在开发时使用在上线后不会使用

                            > npm i 包名 -D

                8. 解决下包问题慢的问题

                    * 原因 默认情况下下包都是从国外进行下载

                    * 国内淘宝npm镜像服务器

                        * 将国外npm包数据同步到国内的服务器上

                        * 对国内用户提供下包服务

                            > 何为镜像: 一个磁盘上的数据在另一个磁盘上存在完全相同的副本

                    * 切换下包源

                        * 查看npm下包地址

                            > npm config get registry //默认情况下是在国外npm官方下载

                        * 切换淘宝下载地址

                            > npm config set registry=https://registry.npm.taobao.org/

                        * nrm

                            * 为了更方便的查看和切换下包服务器地址

                            * 安装nrm

                                > npm i nrm -g

                            * 查看可用的下包服务器地址(镜像源)

                                > nrm ls

                            * 切换镜像源

                                > nrm use 镜像源

                9. 包的分类

                    * 项目包: 被安装到node_module里的都是

                        * 开发依赖包 被记录到devDependent节点的包
                        * 核心依赖包 被记录到dependencies节点中的包

                    * 全局包

                        * nrm默认情况下被安装在用户文件夹npm下的nrm里

                        * 卸载全局包

                            > npm uninstall 包名 -g

                        * 判断是否需要安装全局包参考[官方说明]('https://www.npmjs.com/')

                    * i5ting_toc包转化md为html

                        * 安装i5ting_toc

                            > npm install -g i5ting_toc

                        * 转化html命令

                            > 先cd到当前目录下

                            > i5ting_toc -f md文件名称 -o   

                            此时会创建一个preview文件夹里面就有你转化后的html文件  -o代表创建好后并在浏览器里打开html文件

                    * 包的内部结构

                        * 包都是以每一个单独的目录存在
                        * 每一个包的顶级目录下必须包含package.json文件
                        * package.json必须包含name version main  分别代表了包的名字版本和入口 

                    * 开发属于自己的包

                        * 创建自己的包名里面包含三个文件 index.js  package.json README.md

                            1. 包的实现

                                * 初始化时间的js代码

                                    * *入口文档*

                                        ```
                                        function FormatTime(*time*) {
                                        
                                           const dt = new Date(*time*);
                                        
                                           const YY = dt.getFullYear();
                                        
                                           const MM = fillzero(dt.getMonth()+1);
                                        
                                           const DD = fillzero(dt.getDay());
                                        
                                           const hh = fillzero(dt.getHours());
                                        
                                           const mm = fillzero(dt.getMinutes());
                                        
                                           const ss = fillzero(dt.getSeconds());
                                        
                                           return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
                                        
                                        } 
                                        
                                        function fillzero(*n*) {
                                        
                                            return *n* > 9 ? *n* : '0'+*n*;
                                            
                                        
                                        }
                                        
                                        module.exports = {
                                        
                                           *// 外界只需要结果不需要fillzero填0的过程
                                           FormatTime
                                        
                                        }
                                        ```

                                        

                                    * Package.json文件代码

                                        ```
                                        {
                                        
                                            "name" : "stream_clear",   //不要和npm官方里的包名冲突
                                        
                                            "version": "1.0.0",
                                        
                                            "main": "index.js",
                                        
                                            "description": "这是一个初始化时间的包",
                                        
                                            "keywords": ["format","timer"],
                                        
                                            "license": "ISC"    
                                        
                                        }
                                        ```

                                    * 调用该包的代码

                                        ```
                                        const timer = require('./diy_npm/index'); 
                                        //此处不写index也行,因为当调用该包的时候无具体路径，会先去查看package.json文件的main入口再去调用index文件
                                        const ntime = new Date();
                                        
                                        const result = timer.FormatTime(ntime);
                                        
                                        console.log(result);
                                        ```

                                * 定义转义HTML的标签

                                    * 目的: 为了防止用户在提交表单的时候输入的html字符被识别

                                    * 代码如下

                                        ```
                                        function change(*htmlStr*) {
                                        
                                            *// 利用正则表达式将里面所有的html特殊字符筛选出来*
                                        
                                            *// g代表了转义所有html字符
                                        
                                            return *htmlStr*.replace(/<|>|"|&/g,(*match*)=>{
                                        
                                                switch(*match*) {
                                        
                                                    case '<' :
                                        
                                                        return '&lt';
                                        
                                                    case '>' :
                                        
                                                        return '&gt';
                                        
                                                    case '"' :
                                        
                                                        return '&quot';
                                        
                                                    case '&' :
                                        
                                                        return '&amp';
                                        
                                                }
                                        
                                            })
                                        
                                        }
                                        
                                        module.exports = {
                                        
                                            change
                                        
                                        }
                                        ```

                                        

                                * 定义还原HTML标签

                                    * 目的; 将转移后的HTML标签再还原呈现在网页

                                    * 代码如下

                                        ```
                                        function unchange(*htmlStr*){
                                        
                                            return *htmlStr*.replace(/&lt|&gt|&quot|&amp/g,(*match*)=>{
                                        
                                                switch(*match*) {
                                        
                                                    case '&lt': 
                                        
                                                        return '<';
                                        
                                                    case '&gt':
                                        
                                                        return '>';
                                        
                                                    case '&quot':
                                        
                                                        return '"';
                                        
                                                    case '&amp':
                                        
                                                        return '&';
                                        
                                                }
                                        
                                            })
                                        
                                        }
                                        
                                        module.exports = {
                                        
                                            unchange
                                        
                                        }
                                        ```

                                        

                                * 模块化拆分

                                    * 思路:

                                        1. 在包根目录下新建一个文件夹用来存放多个功能   src

                                        2. 每一个功能实现后向外提供接口   module.exports

                                        3. 因为最终main入口指向的是index.js所以需要在index.js里来接受所有的功能模块 

                                        4. 再通过外部去调用整个包即调用index.js

                                    * 代码第三部关键步骤

                                        `const dt = require('./src/dt');  *//格式化时间模块*

                                        const ex = require('./src/exchange');   *//定义转换字符与还原字符*

                                        module.exports = {

                                        ​    ...dt,   

                                        ​    ...ex

                                        ​    *//...扩展运算符将对象的属性全部展开*

                                        }`

                                * 包的使用说明文档的书写(都需要以markdown的文本形式呈现)

                                    1. 告诉用户如何安装你的npm包

                                        > npm i ypn //简写你的包名

                                    2. 如何导入

                                        > const ypn = require('ypn');

                                    3. 如何调用里面的方法 写方法介绍的时候每个方法都要独立开来

                                        ```
                                        //调用里面的formatTime方法初始化时间
                                        const dt = ypn.formatTime(new Date());
                                        
                                        //打印结果为2022-12-04 10:29:20
                                        
                                        console.log(dt);
                                        //转换前
                                        const waitchange = '<h1 style="sad">sad&nbsp;</h1>';
                                        // 利用change方法转换后
                                        const comchange = paname.change(waitchange);
                                        // 最终结果为&lth1 style=&quotsad&quot&gtsad&ampnbsp;&lt/h1&gt
                                        console.log(comchange);
                                        //还原前&lth1 style=&quotsad&quot&gtsad&ampnbsp;&lt/h1&gt
                                        const renew = paname.unchange(waitchange);
                                        // 利用unchange方法还原后   <h1 style="sad">sad&nbsp;</h1>
                                        console.log(renew);
                                        ```

                                    4. 说明开源协议

                                        > ISC

                            2. 注册npm账号

                                * 官网直接注册即可

                                * 终端账号登陆

                                    > npm login
                                    >
                                    > 然后让你依次输入信息
                                    >
                                    > 前提一定要将发包地址改为官方的否则发包失败

                                * 发布当前的包

                                    > npm publish

                                * 删除已发布的包(只能在发布后72小时内进行删除, 上传删除的包必须要在24小时后才能发布)

                                    > npm unpublish 包名 --force

                10. 模块的加载机制

                    * 自定义模块的加载机制
                        * 模块优先从缓存中加载从而提高模块的加载效率
                        * 当有自定义模块名和内置模块名冲突优先执行内置模块
                        * 当使用require加载自定义模块的时候一定要以./ 或 ../的形式开头指明路径
                        * 加载模块名字重复问题 
                            * ex: 当文件下同时有 test test.js test.json test.node
                            * require('test'); 
                                1. 优先加载具体文件名
                                2. 其次是js文件
                                3. 其次是json文件
                                4. 最后是node文件
                    * 第三方模块的加载机制
                        * 假如在当前文件下去加载一个任意模块
                            1. 它首先会去在当前文件的根目录下去查找node_module里的模块
                            2. 没有的话去上一级根目录下查找
                            3. 依次查找
                        * require去加载目录
                            1. 首先去看文件夹里的package.json main属性
                            2. 没有则去加载index.js文件

6. Express

    1. 初识express

        * 概念

            * 创建Web服务器
            * Express是基于http内置模块开发出来的
            * 常见的两种服务器:
                1. Web服务器 对外提供网络资源
                2. API服务器 对外提供API接口

        * 安装

            > npm i express@版本号

        * 搭建一个web服务器

            ```*// 导入express模块*
            * const express = require('express');
            
                *// 创建web服务器*
            
                const app = express();
            
                *// 启动服务器*
            
                app.listen(80,()=>{
            
                  console.log('端口已启动');
            
                })
            
            
            ```

        * 监听请求

            * get请求

                ```
                app.get('/user',(req,res)=>{
                		//向客户端响应一个JSON对象
                    res.send({age:28,rname:'asd'});
                    //向客户端响应一个文本字符
                    res.send('hello world')
                })
                ```

            * post请求

                ```
                app.post('/user',(req,res)=>{
                    //express提供的send方法可以返回JSON对象也可以是文本字符串
                    res.send('请求已生效');
                })
                ```

            * req.query获取客户端发送过来的 查询参数

                > 查询参数的概念: url自己添加的参数   例: ?age=10&rname='avc'      req.query获取的是一个JSON对象{"age":"10","rname":"avc"}

                ```
                app.get('/url_num',(req,res)=>{
                    // req.query默认情况下为空对象
                    console.log(req.query);
                    res.send(req.query);
                })
                ```

            * get请求获取动态参数   必须要有  **:**

                ```
                app.get('/user/:id',(req,res)=>{
                    // id是参数名 输入的值是动态匹配过来的 
                    //req.params是动态匹配到的url参数 默认情况下为空对象 
                    console.log(req.params);
                    res.send(req.params);
                })
                ```

                > 这里举个例子哈 ex: 假如你请求的url地址为127.0.0.1/user/10 req.params得到的结果为{"id":"10"} id属性名随便改user后面参数也是任意的

                * 可以匹配多个动态参数   相当于是多个**:**属性名和值一对一

                    ```
                    app.get('/user/:id/:rname',(req,res)=>{
                        // id是参数名 输入的值是动态匹配过来的 
                        //req.params是动态匹配到的url参数 默认情况下为空对象 
                        console.log(req.params);
                        res.send(req.params);
                    })
                    //只需要在url用/分隔就可以匹配
                    ```

        * 托管静态资源

            * 调用express.static()方法对外提供静态资源

                ```
                app.use(express.static('./clock'));
                // 通过它就可以访问到clock目录下的所有文件 想访问clock文件夹下的index.html 在url参数后面加上/index.html
                ```

            * 托管多个静态资源目录

                ```
                app.use(express.static('./clock'));
                app.use(express.static('./flew'));
                //当托管多个资源的时候会先去托管第一个静态资源目录如果没内容就托管第二个
                ```

            * 托管静态资源前挂载前缀

                ```
                app.use('/public',express.static('./clock'));
                //代表在填写url时必须要加/public前缀
                ```

        * nodemon

            * 作用:在你修改代码并保存后会自动帮助你重启服务 和live-server类似

            * 安装

                > npm i -g nodemon

            * 启动服务

                > nodemon 文件名.js

        * 

    2. 路由

        1. 概念: 映射关系

        2. Express路由分为三部分 请求方式 请求url地址 处理函数 

            > Express里客户端请求和服务端处理函数就是映射关系

        3. express配置路由代码实现

            ```
            app.get('/',(req,res)=>{
            		/代表url路径 /和后面的处理函数时映射关系
                res.send('hello world')
            })
            ```

        4. 挂载路由的简单实现

            ```
            app.get('/',(req,res)=>{
                res.send('get request');
            })
            app.post('/',(req,res)=>{
                res.send('post request');
            })
            ```

        5. 模块化路由

            * 创建路由模块

                ```
                const express = require('express');
                // 创建路由对象
                const routine = express.Router();
                // 挂载路由
                routine.get('/get',(req,res)=>{
                    res.send('get module on')
                })
                routine.post('/post',(req,res)=>{
                    res.send('post module on');
                })
                // 向外导出路由对象
                module.exports = routine 
                ```

            * 注册路由模块

                ```
                // 导入路由模块
                const routine = require('./18-module路由');
                // 注册路由模块
                app.use(routine);
                //app.use用来注册全局中间件(后面会提到)
                ```

            * 为路由模块加上前缀

                ```
                app.use('/app',routine);  //意思是必须要加上/app前缀才能访问到响应结果
                ```

        6. 中间件

            * 概念: 中间处理过程

            * Express中间件调用流程

                > 在请求到达服务器的时候会调用多个中间件 从而达到预处理的效果

            * 本质

                > 中间件本质上就是处理函数 参数中必须包含next参数 可以用来区分是中间件处理函数还是路由处理函数

            * next函数

                > next可以实现多个中间件的调用 当第一个中间件执行完通过next调用下一个中间件最后到达路由

            * 定义一个简单的中间件

                ```
                const cen = function(req,res,next){
                    console.log('hello');
                    // 将流转关系转交给下一个中间件
                    next();
                }
                ```

            * 全局生效的中间件

                * 到达服务器后都会触发的中间件

                    > app.use(cen);

                * 全局中间件实现案例

                    ```
                    const cen = function(req,res,next){
                        console.log('hello');
                        //在请求发送到服务端到时候就去打印hello
                        // 将流转关系转交给下一个中间件
                        next();
                    }
                    app.use(cen);
                    app.get('/',(req,res)=>{
                    		console.log('此时已经打印完中间件了');
                        // 由于只有一个中间件这时打印路由返回的结果
                        res.send('这时已经调用了路由了哦');
                    })
                    ```

                * 简化版全局中间件的书写

                    ```
                    app.use(function(req,res,next){
                        console.log('hello world');
                        next();
                    })
                    ```

                * 中间件的作用

                    * 因为中间件都共享一份req和res   可以在上游的中间件req,res里添加自定义属性和值来供下游使用

                    * 代码展示

                        ```
                        app.use((req,res,next)=>{
                            // 获取请求到达服务器的时间
                            const time = Date.now();
                            req.firstime = time;
                            next();
                        })
                        app.get('/',(req,res)=>{
                            res.send('这次发送请求到达服务器的时间'+req.firstime);
                        })
                        app.get('/index',(req,res)=>{
                            res.send('这次发送请求到达服务器的时间'+req.firstime);
                        })
                        ```

                * 定义多个全局中间件

                    ```
                    app.use((req,res,next)=>{
                        console.log('第一个中间件');
                        next();
                    })
                    app.use((req,res,nex)=>{
                        console.log('第二个中间件');
                        next();
                    })
                    app.get('/',(req,res)=>{
                        console.log('这里是路由中心');
                        res.send('hello');
                    })
                    //按照定义的中间件的顺序去打印结果
                    //中间件的结束标志是路由
                    ```

            * 局部生效的中间件

                * 概念: 不使用app.use定义的中间件 并且只会在当前中间件内生效

                * 代码展示

                    ```
                    const m1 = function(req,res,next) {
                        console.log('这是一个局部中间件');
                        next();
                    }
                    app.get('/',m1,(req,res)=>{
                    	//往路由中间添加一个中间件叫局部中间件
                        res.send('hello');
                    })
                    app.get('/index',(req,res)=>{
                        res.send('world');
                        //在我们请求index时候并不会打印局部中间件里的内容
                        //而在全局作用域里会打印中间件里的内容
                    })
                    ```

                * 定义多个局部中间件

                    ```
                    const c1 = function(req,res,next){
                        console.log('这时第一个中间件');
                        next();
                    }
                    const c2 = function(req,res,next){
                        console.log('这时第二个中间件');
                        next();
                    }
                    //c1,c2 写成[c1,c2]也可以
                    //创建路由 
                    app.get('/',c1,c2,(req,res)=>{
                        res.send('nb');
                    })
                    app.listen(80,()=>{
                        console.log('端口已启动');
                    })
                    ```

            * 注意事项

                1. 中间件一定要写在创建路由前面
                2. 创建中间件的时候不要忘记加上next()
                3. next()后面不要写额外的代码

            * 中间件的分类

                1. 应用级别中间件 绑定到app身上的

                2. 路由级别中间件 绑定到Router实例上

                3. 错误中间件 用来捕获异常的

                    * 代码展示

                        ```
                        app.get('/',(req,res)=>{
                            throw new Error('程序执行错误');
                        })
                        app.use(function(err,req,res,next){
                        		//err参数主要是用来捕获错误
                            console.log('程序出错');
                            res.send('Error:'+err.message);
                            //err.message就是上面抛出的错误提示
                        })
                        ```

                    * 注意事项: 错误中间件一定注册在路由后面 

                4. 内置中间件 **使用postman一定要下载客户端 web版不支持本地服务**

                    * express.static 解析静态资源

                    * express.json 解析JSON表单数据 Express4.16.0+兼容

                        > 配置express.json中间件来解析客户端发送的JSON数据

                        ```
                        //req.params,req.query是用在get请求当中，而req.body是用在post请求中的
                        app.use(express.json());//配置解析中间件
                        app.post('/user',(req,res)=>{
                            //服务器使用req.body来接收客户端发送的url-encoded格式的数据
                            //如果想要获取客户端发送的表单数据 需要配置解析中间件
                            console.log(req.body);
                            res.send('hello');
                        }) 
                        ```

                        

                    * express.urlencoded 解析URL-encoded形式的表单数据 Express4.16.0+兼容

                        ```
                        //同理通过配置urlencoded来解析对象
                        app.use(express.urlencoded({extended : false}));
                        ```

                5. 第三方中间件

                    * 安装body-parser中间件

                        > npm i body-parser

                    * 使用body-parser中间件来实现服务端对客户端发送的请求进行解析

                        ```
                        const parser = require('body-parser'); 
                        app.use(parser.urlencoded({extended:false})); //express.urlencoded是基于该中间件封装出来的
                        ```

            * 自定义中间件

                * 调用中间件代码

                    ```
                    const express = require('express');
                    const app = express();
                    
                    // 定义一个解析表单数据的中间件
                    const fn = require('./封装的中间件函数');
                    // 将自定义的中间件注册为全局可用的中间件
                    app.use(fn);
                    app.post('/',(req,res)=>{
                        res.send(req.dt);
                    })
                    app.listen(80,()=>{
                        console.log('服务端口已启动');
                    })
                    ```

                * 封装的中间件函数代码

                    ```
                    const qs = require('querystring');
                    const fn = (req,res,next)=>{
                        // str用来接收客户端发送过来的表单数据
                        let str = '';
                        // 监听data事件
                        req.on('data',(chunk)=>{
                            // 如果数据量比较大需要将其分割成很多份的chunk数据
                            str+=chunk;
                        })
                        // 监听end事件拿到完整的表单数据
                        req.on('end',(chunk)=>{
                            // console.log(str);
                            // 拿到完整的字符后需要将其转化为对象
                            const dt = qs.parse(str);
                            // 利用querystring的parse方法将字符串解析为对象
                            // console.log(dt);
                            // 挂载到req的属性身上
                            req.dt = dt;
                            next();
                        })
                    }
                    //导出中间件封装函数
                    module.exports = fn;
                    ```

        7. * 利用express书写接口

                * 调用路由模块

                    ```
                    const express = require('express');
                    const app = express();
                    app.use(express.urlencoded({extended : false}));
                    当解析url-encoded类型的数据必须要配置中间件
                    const router = require('./挂载路由');
                    // /api为统一的访问路径
                    // 在这里router就是一个中间件
                    app.use('/api',router);
                    app.listen(80,()=>{
                        console.log('服务器已启动');
                    })
                    ```

                * 路由模块制作

                    ```
                    const express = require('express');
                    // 挂载对应路由
                    const router = express.Router();
                    //挂载get请求
                    router.get('/get',(req,res)=>{
                        //通过req.query通过查询字符串 拿到客户端发送到服务端的数据
                        const query = req.query;
                        //将完整的数据再返回到客户端
                        res.send({
                            status: 0,
                            msg : '请求成功',
                            data: query
                        })
                    })
                    挂载post请求
                    router.post('/post',(req,res)=>{
                        const body = req.body;
                        //通过req.body获取的是包含url-encoded类型的数据
                        res.send({
                            status: 0,
                            msg: 'post请求成功',
                            data: body
                        })
                    })
                    module.exports = router;
                    ```

             * 跨域问题

                * 概念 当请求的网页和接口 协议 端口号 域名任意一个不同就会出现跨域问题 

                * 解决方法

                    1. CORS 推荐使用

                        * 操作流程(CORS里第一种实现跨域的方法)

                            * 安装

                            > npm i cors

                            * 导入cors模块

                            > const cors = require('cors');

                            * 配置全局中间件

                            > app.use(cors())

                        * CORS概念(跨域资源共享)

                            * 是由一系列响应头构成 这些HTTP响应头决定是否要阻止JS代码获取网页资源 
                            * 所以可以在服务端配置cors相关的响应头 就可与解除限制

                        * 设置响应头(CORS里第二种实现跨域的方法)

                            ```
                            // 设置允许来自任何网页的请求
                            res.setHeader('Access-Control-Allow-Origin','*');
                            //设置只允许百度的请求
                            res.setHeader('Access-Control-Allow-Origin','https://www.baidu.com/');
                            ```

                            CORS仅支持的九个响应头[参考入口](https://www.bilibili.com/video/BV1a34y167AZ?p=54&spm_id_from=pageDriver&vd_source=e9bfdb3098ad69cc5bdc6786ce0ecb4c)

                        * 设置请求方法

                            ```
                            //允许任何请求方法
                            res.setHeader('Access-Control-Allow-Methods','*');
                            //只允许post和get请求
                            res.setHeader('Access-Control-Allow-Origin','POST GET');
                            ```

                        * 请求类型

                            * 简单请求

                                1. 必须是GET POST HEAD这三种请求方式
                                2. HTTP头部信息不超过某些字段 无自定义字段

                            * 预检请求(option请求)

                                1. 简单请求外的请求方式

                                2. 向服务器发送application/json数据类的请求
                                3. 作用是判断服务器是否允许该请求预检后才能发送真正的请求

                            * 区别

                                1. 简单请求只会发送一次请求
                                2. 预检请求会发送两次 一次option请求一次真正请求

                    2. JSONP

                        * 概念 通过script标签的src属性请求数据 通过函数返回数据

                        * 特点

                            * 不属于AJAX请求 因为没有XMLHttpRequest对象
                            * 只支持get请求
                            * JSONP接口必须要在CORS中间件之前声明

                        * 配置JSONP接口

                            ```
                            app.get('/api/jsonp',(req,res)=>{
                                //得到函数名称
                                const funcname = req.query.callback;
                                //定义发送到客户端的数据
                                const data = {rname:'sad',age:29};
                                //拼接函数调用 函数的参数一定得是JSON格式的字符串
                                const sciptstr = `${funcname}(${JSON.stringify(data)})`;
                                // 响应到客户端
                                res.send(sciptstr);
                            })
                            ```

                        * JQuery发送jsonp请求

                            ```
                            $('.jsonp').on('click',function(){
                                        $.ajax({
                                            type: 'GET',
                                            url: 'http://127.0.0.1/api/jsonp',
                                            dataType: 'jsonp', //表示要发起jsonp请求
                                            success: function(res){
                                                console.log(res);
                                            }
                                        })
                                    })
                            ```

        8. 数据库 

            * 概念: 组织 存储 管理数据

            * 常见数据库(相互弥补)

                1. 传统数据库
                    1. MySQL
                    2. Oracle
                    3. SQL Server
                2. 新型数据库
                    1. Mongodb

            * 数据组织结构

                * 参考Excel
                    * 工作簿 整个excel窗口
                    * 工作表 页签
                    * 数据行
                    * 列
                * 传统数据组织结构
                    * 数据库
                    * 数据表
                    * 数据行
                    * 字段

            * 安装MySQL [教程]('https://www.bilibili.com/video/BV1a34y167AZ?p=59&spm_id_from=pageDriver&vd_source=e9bfdb3098ad69cc5bdc6786ce0ecb4c')

                * MySQL Server 提供数据存储和服务 [官方网址]('https://dev.mysql.com/downloads/mysql/')
                * MySOL Workbench 操作管理存储在MySQL里的数据 [官方网址]('https://dev.mysql.com/downloads/workbench/')

            * MySQL的基本使用

                * 进入workbench应用点击左下角的root输入MySQL密码

                    * 主界面的组成

                        <img src="/Users/satrol_/Pictures/主界面.png" style="zoom:50%;" />

                    * 创建完整的数据库 

                        * 创建一个数据库

                            > 工具栏点击加号圆柱一路apply就可以  

                        * 创建一个数据表

                            * 展开创建好的数据库
                            * 右键里面的table
                            * 设置字段 分别给上值并且设置类型和文字描述 

                        * 设置字段标识

                            * PK 表示主键
                            * NN 表示设置数值不能为空
                            * UQ 表示值唯一
                            * AI 表示值会自动增长

                        * 插入数据

                            * 右键创建好的数据表 点击Select-Row
                            * 字段标识AI 和 含默认值的数据可以不写会自动帮你补齐

                * SQL

                    1. 概念: 结构化查询语言,可以通过编写代码的形式去操控数据库的数据

                    2. SOL学习目标

                        * 增

                        * 删

                        * 改

                        * 查

                    3. SOL语法

                        * 注意事项

                            * 注释:  -- 空格接内容
                            * 关键字对大小写不敏感

                        * 查询数据

                            ```
                            -- 查询数据库里的所有数据
                            -- select * from 01_db.users
                            -- 查询数据库里的用户名和密码
                            select username,password from 01_db.users
                            ```

                        * 插入数据

                            ```
                            -- 插入数据
                            insert into 01_db.users (username,password) values ('sad','12345')
                            ```

                        * 更新用户的数据

                            ```
                            -- 将id=3这个人的密码更新为987654
                            update 01_db.users set password='987654' where id=3
                            ```

                            ```
                            -- 更新单行里的多列
                            update 01_db.users set password='8888',status=1 where id=2
                            ```

                        * 删除数据

                            ```
                            -- 删除id=3的数据
                            delete from 01_db.users where id=3
                            ```

                        * Where子句

                            > where子句里可以使用运算符来限定select的查询条件   < >可以写成!=

                            ```
                            -- 选出状态等于1的数据
                            -- select * from 01_db.users where status=1
                            -- 选出id小于3的数据
                            -- select * from 01_db.users where id<3
                            -- 选出密码不等于8888的数据
                            -- select * from 01_db.users where password<>'8888'
                            -- select * from 01_db.users where password!='8888'
                            ```

                        * AND和OR运算符

                            ```
                            -- 筛选密码为8888并且状态为1的数据  and相当于&&
                            -- select * from 01_db.users where password='8888' and status=1
                            -- 筛选状态为1或者是用户名为zs的数据 or相当于||
                            -- select * from 01_db.users where status=1 or username='zs'
                            ```

                        * 排序 

                            ```
                            -- ASC代表升序排序 默认情况下是升序
                            -- 将status从小到大排序
                            -- select * from 01_db.users order by status ASC 
                            -- DESC代表降序排序
                            -- 将id从大到小进行排序
                            -- select * from 01_db.users order by id desc 
                            ```

                            ```
                            -- 多重排序 查询status倒序排列username字母升序
                            select * from 01_db.users order by status desc,username asc
                            ```

                        * COUNT(*) 

                            ```
                            -- 统计status为0的数据的总条数
                            select count(*) from 01_db.users where status=0
                            ```

                        * AS起别名

                            ```
                            -- 给统计好的条数起别名total
                            -- select count(*) as total from 01_db.users where status
                            -- 给密码起别名为pwd
                            -- select password as pwd from 01_db.users
                            ```

                    4. 在项目里操作MySOL  

                        ```
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
                        db.query('select 1',(err,result)=>{
                            if (err) return console.log(err.message);
                            // 如果正常执行打印result结果
                            console.log(result);
                        })
                        //返回结果为[ RowDataPacket { '1': 1 } ]则证明引入成功
                        ```

                        * 查询数据

                            ```
                            const sqldb = 'select * from users';
                            db.query(sqldb,(err,result)=>{
                                if(err) return console.log(err.message);
                                console.log(result);
                                //执行结果都是以数组的形式存储的对象
                            })
                            ```

                        * 插入数据

                            ```
                            //定义待插入的语句
                            const human = {username: 'star',password: '123456'};
                            //? 充当占位符好方便human插入数据
                            const insql = 'insert into users (username,password) values (?,?)';
                            // 可以使用数组的形式依次为占位符添加值
                            db.query(insql,[human.username,human.password],(err,result)=>{
                                if(err) return console.log(err.message);
                                // 插入语句通过affectedRows来判断是否插入成功
                                // 如果响应的行数为1则代表该数据插入成功
                                else if(result.affectedRows===1) {
                                    // 在这里面result是一个对象
                                    console.log('插入数据成功');
                                }
                            })
                            ```

                            注意点: 之前的数据如果被删除了也依旧占据它的位置

                            ```
                            //插入数据的便捷方式
                            const human = {username:'mmm',password: '123456'};
                            // 待执行的sql语句
                            const insql = 'insert into users set ?';
                            // 直接将数据对象human当作占位符的值
                            db.query(insql,human,(err,result)=>{
                                if(err)return console.log(err.message);
                                else if(result.affectedRows===1) {
                                    console.log('插入成功');
                                }
                            })
                            ```

                        * 更新数据

                            ```
                            const up10 = {username:'ldh',password:'0000',id:10};
                            const upsql = 'update users set username=?,password=? where id=?';
                            db.query(upsql,[up10.username,up10.password,up10.id],(err,result)=>{
                                if(err)return err.message;
                                else if(result.affectedRows===1) {
                                    console.log('更新成功');
                                }
                            })
                            ```

                            ```
                            //更新数据的便捷方式
                            const up12 = {username: 'hill',password: '9999',id:12};
                            const upsql = 'update users set ? where id=?';
                            db.query(upsql,[up12,up12.id],(err,result)=>{
                                if(err) return console.log(err.message);
                                if(result.affectedRows===1) {
                                    console.log('更新成功');
                                }
                            })
                            ```

                        * 删除数据

                            ```
                            const del1 = 'delete from users where id=?';
                            // 当只需要删除单个数据的时候不需要用对象加数组的形式去删除 
                            db.query(del1,1,(err,result)=>{
                                if (err) return console.log(err.message);
                                // delete结果也是一个对象也有affecedRows属性
                                else if (result.affectedRows===1) {
                                    console.log('删除成功');
                                }
                            })
                            ```

                            使用delete删除语句会真正删除用户数据为了保险起见使用标记status删除更好

                            ```
                            //标记删除
                            const upsql = 'update users set status=? where id=?';
                            db.query(upsql,[1,12],(err,result)=>{
                                if(err) return console.log(err.message);
                                if(result.affectedRows===1) {
                                    console.log('标记删除成功');
                                }
                            })
                            ```

                    5. Web开发模式

                        * 服务端渲染的Web开发模式

                            * 概念 服务端通过字符串动态拼接

                            * 优缺点

                                * 优点

                                    1. 耗时少

                                    2. 有利于SEO 渲染的是完整的画面 方便爬虫

                                * 缺点 

                                    1. 服务端压力大 请求多 字符串拼接

                                    2. 不利于前后端开发 任务都在服务端

                        * 前后端分离

                            * 概念 后端提供API接口前端利用AJAX调用接口
                            * 优缺点 
                                * 优点
                                    1. 前后端各专注各的
                                    2. 用户可以实现AJAX局部更新
                                    3. 减轻服务器渲染压力
                                * 缺点
                                    1. 不利于SEO 因为拼接页面的过程是在客户端实现的

                        * 如何选择

                            * 不怎么注重交互性 想要良好的SEO 选渲染
                            * 反之选前后端分离

                    6. 身份认证

                        * 概念 一定手段完成对用户信息的确认

                        * 不同开发模式下的身份认证

                            1. 服务端渲染 	Session认证机制

                                * HTTP的无状态性

                                    > 客户端的每一次http请求都是独立的 服务端不会保留每次的http请求

                                * 突破HTTP的无状态性 

                                    > 利用cookie保留客户端本次的http请求 cookie相当于会员卡

                                * cookie

                                    1. cookie是存储在浏览器里不超过4KB的字符串 

                                        > 由键值对,有效期,安全性,使用范围组成

                                    2. 各个域名下的cookie是独立的 

                                        > 当用户请求的时候会将当前域名下未过期的所有cookie发送到服务器 来验证用户身份

                                * Cookie在身份认证的作用

                                    * 身份认证的流程

                                        1. 客户端在浏览器内登陆
                                        2. 服务器通过响应头的形式给浏览器Cookie
                                        3. 浏览器保存Cookie到当前域名下
                                        4. 下一次用户再访问该域名网站 浏览器以请求头的形式发送Cookie给服务器
                                        5. 服务器确认用户身份 响应对应的结果

                                    * cookie不具有安全性

                                        1. cookie很容易被伪造
                                        2. 不建议使用cookie保存用户信息

                                    * session认证机制核心

                                        > 不仅需要客户端出示cookie 还需要服务端对出示的cookie进行认证

                                * 配置session中间件

                                    * 安装express-session

                                        > npm i express-session

                                    * 代码配置

                                        ```
                                        // 配置session中间件
                                        const session = require('express-session');
                                        app.use(session({
                                            secret: 'user_msg',
                                            resave: false,
                                            saveUninitialized: true
                                        }))
                                        ```

                                    * session代码演示

                                        * 往session里存数据

                                            ```
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
                                            ```

                                        * 从session里获取数据

                                            ```
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
                                            ```

                                        * 清除session里的数据

                                            ```
                                            //清除数据
                                            app.post('/api/logout',(req,res)=>{
                                                // 清空所在客户端的session信息
                                                req.session.destroy();
                                                res.send({
                                                    status:0,
                                                    msg: '退出登陆成功'
                                                })
                                            })
                                            ```

                                    * session认证是不支持跨域请求的

                            2. 前后端分离      JWT身份认证机制

                                * 概念 :JWT是 **跨域** 认证解决方案

                                * 工作原理

                                    1. 用户通过浏览器向服务端发送信息
                                    2. 服务端将信息加密生成token字符串再将其保存到浏览器的localstroage或sessionstorage  服务器不保存该信息
                                    3. 当再次访问浏览器通过请求头的Authentic将token传递给服务端
                                    4. 服务端还原用户数据 验证信息
                                    5. 两种区别 JWT信息保存在浏览器里 而Session是将信息保存在服务端

                                * JWT组成部分   三者以.号分隔

                                    1. 头部(Header)

                                        * 保证用户安全性

                                    2. 有效荷载(Payload)

                                        * Payload是用户信息加密后的字符串

                                        3. 签名(Signature)

                                        * 保证用户安全性

                                * express中生成token

                                    * 下载 jsonwebtoken(用来生成jwt字符)和express-jwt(用来将jwt字符转化为JSON对象)

                                        > npm i jsonwebtoken express-jwt 
                                        >
                                        > 自行调整版本 npm i 包名@version

                                        引入模块

                                        ```
                                        const expressjwt = require('express-jwt');
                                        const jwt = require('jsonwebtoken');
                                        ```

                                    * 定义secret密钥 用于对JWT字符的加密和解密

                                        ```
                                        const secretKey = '*_*';
                                        ```

                                    * 调用jsonwebtoken的sign方法生成JWT字符

                                        ```
                                        app.post('/',(req,res)=>{
                                            res.send({
                                                status: 200,
                                                msg: '登陆成功',
                                                token: jwt.sign({username:req.body.username},secretKey,{expiresIn:'30s'})
                                                // 三个参数分别为用户的信息 密钥 token有效期    
                                            })
                                        })
                                        ```

                                    * 将JWT转化为JSON对象

                                        ```
                                        //配置对象里的内容表示使用这个密钥对jwt字符进行解密
                                        // unless指定那些接口不需要访问权限 利用正则表达式表示凡是以/api开头的都不需要访问权限
                                        app.use(expressjwt({secret:secretKey}).unless({path:[/^\/api\//]}));
                                        ```

                                    * 在配置好express-jwt的前提下,可以在有权限的接口下通过req.user解析用户信息

                                    * 注意事项 

                                        * 不要将密码信息加密到token里否则很容易被别人通过req.user将密码获取
                                        * 解析token前需要加Bearer

                                    * 捕获JWT解析失败的不同结果

                                        ```
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
                                        ```
