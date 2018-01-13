const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webApp.js');
const NewToDo = require('./lib/newToDo.js');
const loginPage = fs.readFileSync('./static/login.html');
const home = fs.readFileSync('./dynamic/homePage.html');
const data = fs.readFileSync('./data/pranoy.js','utf8');

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

let registered_users = [{userName:'pranoyk', name:'pranoy'}, {userName:'pavanigbn', name:'pavani'}, {userName:'rahulp', name:'rahul'}];

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

const retrieveData = (newData,req,res)=>{
  let data = fs.readFileSync(`./data/${req.user.name}.js`,'utf8');
  let commentData = data.split('= ')[1];
  let modifiedData = JSON.parse(commentData);
  modifiedData.unshift(newData);
  return finalComment = `var data = ${JSON.stringify(modifiedData,null,2)}`;
}

const storeToDo = (req,res)=>{
  let name = req.user.name;
  let newData = new NewToDo(req.body,name);
  let toDoItems = newData.processData()
  let retrievedData = retrieveData(toDoItems,req,res);
  fs.writeFileSync(`./data/${req.user.name}.js`,retrievedData);
  res.redirect('/homePage');
}

const retrieveReqTodo = (reqTodo,req,res)=>{
  let reqData = '';
  reqData+=`Title : ${reqTodo.title} \n Description : ${reqTodo.description} \n Todo Item : ${reqTodo.toDoItems}`;
  res.write(`<a href="homePage">Go back to Home</a>\n<a href="/logout">logout</a>\n${reqData}`);
  res.end();
}

const showTodo = (req,res)=>{
  let name = req.user.name;
  let requiredTitle = req.body.view;
  let presentData = JSON.parse(data.split('= ')[1]);
  let requiredTodo = presentData.filter(data=>{
    return data.title==requiredTitle;
  });
  retrieveReqTodo(requiredTodo[0],req,res);
}

const serveDynamicFiles = (req,res)=>{
  if (req.method=='GET'&&fs.existsSync(`./dynamic${req.url}`)) {
    res.write(fs.readFileSync(`./dynamic/${req.url}`));
    res.end();
  }
}

const serveData = (req,res)=>{
  if (req.url.includes('data/')) {
    res.write(fs.readFileSync(req.url));
    res.end();
  }
}

const serveStaticFile = (req,res)=>{
  if(req.urlIsOneOf(['/','login.html'])&&!req.user) res.redirect('/login.html');
}

const redirectToHomePage = (req,res)=>{
  if(req.url=='/'&&req.user) res.redirect('/homePage');
}

const serveStaticCssFile = (req,res)=>{
  if(req.url=='/css/login.css') res.redirect('/login.css');
}

let app = WebApp.create();
app.usePreProcessor(logRequest);
app.usePreProcessor(loadUser);
app.usePostProcessor(serveStaticFile);
app.usePostProcessor(serveStaticCssFile);
app.usePreProcessor(redirectToHomePage);

app.get('/logout',(req,res)=>{
  res.redirect('/login.html');
})

app.get('/login.html', (req,res)=>{
  res.setHeader('Content-type','text/html');
  if(req.cookies.message)
    res.write(`Login Failed \n Invalid User`);
  res.write(loginPage);
  res.end();
})

app.get('/login.css', (req,res)=>{
  res.setHeader('Content-Type',getHeader(req.url));
  res.write(fs.readFileSync('./static/css'+req.url));
  res.end();
})

app.get('/homePage', (req,res)=>{
  res.write(home);
  res.end();
})

app.post('/login.html',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  console.log(user);
  if(!user) {
    res.setHeader('Set-Cookie',`message=Login Failed; Max-Age=5`);
    res.redirect('/login.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  console.log(sessionid);
  res.redirect('/homePage');
});

app.get('/addToDo.html', (req,res)=>{
  res.write(fs.readFileSync('./dynamic/addToDo.html'));
  res.end();
})

app.get('/viewToDo.html', (req,res)=>{
  res.write(fs.readFileSync('./dynamic/viewToDo.html'));
  res.end();
})

app.post('/newToDo',(req,res)=>{
  storeToDo(req,res);
})

app.post('/viewTodo',(req,res)=>{
  showTodo(req,res);
})

app.get('/data/pranoy.js',(req,res)=>{
  res.write(fs.readFileSync('./data/pranoy.js'));
  res.end();
})

app.get('/js/renderTitle.js',(req,res)=>{
  res.write(fs.readFileSync('./dynamic/js/renderTitle.js'));
  res.end();
})

app.get('/js/addToDo.js',(req,res)=>{
  res.write(fs.readFileSync('./dynamic/js/addToDo.js'));
  res.end();
})

exports.app = app;
