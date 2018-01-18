const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webApp.js');
const loginPage = fs.readFileSync('./static/login.html');
const User = require('./lib/user.js');
const registered_users = require('./lib/userRegistry.js').userRegistry;
const LoginHandler = require('./handlers/login_handler.js');
const PostLoginHandler = require('./handlers/post_login_handler.js');
let allUser = JSON.parse(fs.readFileSync('./data/todos.json'));
let homePage = fs.readFileSync('./dynamic/homePage.html','utf8');

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

const writeToJSONFile = (res,userData)=>{
  fs.writeFileSync('./data/todos.json',JSON.stringify(userData,null,2));
  res.redirect('/homePage');
}

const redirectToLoginPage = (req,res)=>{
  if(req.urlIsOneOf(['/','login','/homePage','/addToDo','/newToDo','/viewToDo']) && !req.user) {
    res.redirect('/login');
  }
}

const serveHomePage = (req,res)=>{
  if(req.urlIsOneOf(['/','/login','/loginPage','/home']) && req.user) {
    res.redirect('/homePage');
  }
}

const serveStaticFiles = (req,res)=>{
  if(req.url.includes('static/')){
    res.setHeader('Content-Type',getHeader(req.url));
    res.write(fs.readFileSync('./'+req.url))
    res.end();
  }
}

let app = WebApp.create();
app.usePreProcessor(logRequest);
app.usePreProcessor(loadUser);
app.usePostProcessor(redirectToLoginPage);
app.usePostProcessor(serveHomePage);
app.usePreProcessor(serveStaticFiles);

let login = new LoginHandler();
app.get('/login',login.getRequestHandler());

app.get('/logout',(req,res)=>{
  res.redirect('/login');
})

app.get('/homePage', (req,res)=>{
  if(req.user){
    homePage = homePage.replace(/USER/,`${registered_users[0]['name']}`);
    res.write(homePage);
    res.end();
  }
})

app.get('/addToDo',(req,res)=>{
  if(req.user){
    res.write(fs.readFileSync('./dynamic/addToDo.html'));
    res.end();
  }
})

app.get('/viewToDo',(req,res)=>{
  res.write(fs.readFileSync('./dynamic/viewToDo.html'),'utf8');
  res.end();
})

app.get('/viewTodo',(req,res)=>{
  res.write(JSON.stringify(allUser)||"");
  res.end();
})

let postLogin = new PostLoginHandler(registered_users);
app.post('/login',postLogin.getRequestHandler());

app.post('/newToDo',(req,res)=>{
  let user = allUser.find(u=>u.userName==req.user.userName);
  let newUser = new User(registered_users[0]['name']);
  let todoCount = registered_users[0].count;
  console.log('items===============>',req.body.items);
  let item = req.body.items;
  if(typeof(item)=='string'){
    let todoItem = [];
    todoItem.push(item);
    newUser.addNewTodo(todoCount,req.body.title,req.body.description,todoItem);
  } else {
    newUser.addNewTodo(todoCount,req.body.title,req.body.description,item);
  }
  registered_users[0].count++;
  allUser.unshift(newUser);
  writeToJSONFile(res,allUser);
})

exports.app = app;
