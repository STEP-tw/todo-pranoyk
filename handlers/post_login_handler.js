const fs = require('fs');
const DefaultHandler = require('./default_Handler.js');

class PostLoginHandler extends DefaultHandler {
  constructor(registered_users) {
    super();
    this.registered_users = registered_users;
  }
  execute(req,res) {
    let user = this.registered_users.find(u=>u.userName==req.body.userName);
    if(!user) {
      res.setHeader('Set-Cookie',`message=Login Failed; Max-Age=5`);
      res.redirect('/login');
      return;
    }
    let sessionid = new Date().getTime();
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    user.sessionid = sessionid;
    console.log(sessionid);
    res.redirect('/homePage');
  }
}

module.exports = PostLoginHandler;
