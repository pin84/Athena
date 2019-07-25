const http = require('http');
const url = require('url');

let httpServer = http.createServer((req,res)=>{
    let {pathname,query} = url.parse(req.url,true);

    if(pathname == '/industry'){
        res.write(JSON.stringify({
            data:"test"
        }))
        res.end();

    }
})

httpServer.listen(9090);
console.log('http://localhost:9090')