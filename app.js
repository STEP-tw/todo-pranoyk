const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webApp.js');
const loginPage = fs.readFileSync('./static/login.html');

let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}

let registered_users = [{userName:'pranoyk', name:'Pranoy'}, {userName:'pavanigbn', name:'Pavani'}, {userName:'rahulp', name:'Rahul'}];

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

const getHeader = function (file) {
  let extension = file.slice(file.lastIndexOf('.'));
  let headers = {
    '.html' : 'text/html',
    '.jpg' : 'text/jpg',
    '.pdf' : 'text/pdf',
    '.css' : 'text/css',
    '.gif' : 'text/gif',
    '.js' : 'text/js'
  }
  return headers[extension];
}

const serveStaticFile = (req,res)=>{
  if(req.url=='/'&&!req.user) res.redirect('/login.html');
}

const serveStaticCssFile = (req,res)=>{
  if(req.url=='/css/login.css'&&!req.user) res.redirect('/login.css');
}


let app = WebApp.create();
app.usePreProcessor(logRequest);
app.usePreProcessor(loadUser);
app.usePostProcessor(serveStaticFile);
app.usePostProcessor(serveStaticCssFile);

app.get('/login.html', (req,res)=>{
  res.setHeader('Content-Type',getHeader(req.url));
  res.write(loginPage);
  res.end();
})

app.get('/login.css', (req,res)=>{
  res.setHeader('Content-Type',getHeader(req.url));
  res.write(fs.readFileSync('./static/css'+req.url));
  res.end();
})

exports.app = app;