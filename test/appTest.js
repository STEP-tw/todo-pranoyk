let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../app.js').app;
let th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })

  describe('GET /',()=>{
    it('serves to login.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,'Login');
        done();
      })
    })
  })

  describe('GET /login',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Your TO-DO');
        done();
      })
    })
  })

  describe.skip('GET /addToDo.html',()=>{
    it('gives add To-Do page when user id logged in',done=>{
      request(app,{method:'GET',url:'/addToDo.html'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'New To-Do');
        done();
      })
    })
  })

  describe('GET /login.html',()=>{
    it('serves the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.body_does_not_contain(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('serves the login page with message for a failed login',done=>{
      request(app,{method:'GET',url:'/login',headers:{'cookie':'message=login failed'}},res=>{
        th.status_is_ok(res);
        th.should_not_have_cookie(res,'message');
        th.should_not_have_cookie(res,'sessionid');
        done();
      })
    })
  })

  describe('POST /login.html',()=>{
    it('redirects to homePage for valid user',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=pranoyk'},res=>{
        th.should_be_redirected_to(res,'/homePage');
        th.body_contains(res, 'Hello Pranoy')
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('redirects to login with message for invalid user',done=>{
      request(app,{method:'POST',url:'/login',body:'username=badUser'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','Login Failed');
        done();
      })
    })
  })
});
