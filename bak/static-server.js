const http = require('http');
const path = require('path');
const fs = require('fs')
const config = require('./config/default');

class StaticServer {
  constructor() {
    this.port = config.port;
    this.root = config.root;
    this.indexPage = config.indexPage;
  }

  responseNotFound(req, res) {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    })
    res.end(`<h1>Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
  }

  responseFile(pathName, req, res) {
    const readStream = fs.createReadStream(pathName)
    readStream.pipe(res)
  }


  routeHandler(pathName, req, res) {
    console.log(pathName);
    
    
    fs.stat(pathName, (err, stat) => {
      if (!err) {
        this.responseFile(pathName, req, res)
      } else {
        this.responseNotFound(req, res)
      }
    })

  }

  start() {
    http.createServer((req, res) => {
      const pathName = path.join(this.root, path.normalize(req.url));
      // res.writeHead(200);
      // res.end(`Requeste path: ${pathName}`);
      this.routeHandler(pathName, req, res)
    }).listen(this.port, err => {
      if (err) {
        console.error(err);
        console.info('Failed to start server');
      } else {
        console.info(`Server started on port ${this.port} ...`);
      }
    });
  }
}

module.exports = StaticServer;