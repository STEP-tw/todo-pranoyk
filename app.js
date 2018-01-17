const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webApp.js');
const NewToDo = require('./lib/newToDo.js');
const loginPage = fs.readFileSync('./static/login.html');
const loginPageCss = fs.readFileSync('./static/css/login.css');
const User = require('./lib/user.js');
const registered_users = require('./lib/userRegistry.js').userRegistry;
let homePage = fs.readFileSync('./dynamic/homePage.html','utf8');
let newUser = {};

const home = fs.readFileSync('./dynamic/homePage.html');
const data = fs.readFileSync('./data/pranoy.js','utf8');

const toS = o=>JSON.stringify(o,null,2);

const logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}

const loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

const serveLoginPage = (req,res)=>{
  if(req.urlIsOneOf(['/','/login']) && !req.user) {
    res.write(loginPage);
    res.end();
  } else if (req.url=='/css/login.css') {
    res.write(loginPageCss);
    res.end();
  }
}

const redirectToLoginPage = (req,res)=>{
  if(req.urlIsOneOf(['/homePage'])) {
    res.redirect('/login');
  }
}

const serveHomePage = (req,res)=>{
  if(req.urlIsOneOf(['/','/login','/loginPage','/home']) && req.user) {
    res.redirect('/homePage');
  }
}

let app = WebApp.create();
app.usePreProcessor(logRequest);
app.usePreProcessor(loadUser);
app.usePostProcessor(serveLoginPage);
app.usePostProcessor(redirectToLoginPage);
app.usePostProcessor(serveHomePage);

app.get('/login', (req,res)=>{
  res.setHeader('Content-type','text/html')
  if(req.cookies.message)
    res.write(`Login Failed \n Invalid User`);
  res.write(loginPage);
  res.end();
})

app.get('/homePage', (req,res)=>{
  if(req.user){
    homePage = homePage.replace(/USER/,`${registered_users[0]['name']}`);
    res.write(homePage);
    res.end();
  }
})

app.post('/login',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  console.log(user);
  if(!user) {
    res.setHeader('Set-Cookie',`message=Login Failed; Max-Age=5`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  console.log(sessionid);
  newUser = new User(user.name);
  res.redirect('/homePage');
});

exports.app = app;
