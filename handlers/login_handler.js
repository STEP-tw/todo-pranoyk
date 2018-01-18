const fs = require('fs');
const loginPage = fs.readFileSync('./static/login.html','utf8');
const DefaultHandler = require('./default_Handler.js');

class LoginHandler extends DefaultHandler {
  constructor() {
    super();
  }
  execute(req,res) {
    res.setHeader('Content-type','text/html')
    if(req.cookies.message)
      res.write(`Login Failed \n Invalid User`);
    res.write(loginPage);
    res.end();
  }
}

module.exports = LoginHandler;
