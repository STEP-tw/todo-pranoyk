const User = require('../lib/user.js');
const chai = require('chai');
let assert = chai.assert;

describe('User',()=>{
  describe('addNewTodo()',()=>{
    it('should add new todo in users all todos',()=>{
      let user = new User('pranoy');
      user.addNewTodo(1,'home','todays work',['eat','sleep']);
      let expected = {};
      expected[1] =
        {title:'home',
        description:'todays work',
        toDoItems:{
          "1": {
            "content": "eat",
            "isDone": false
          },
          "2": {
            "content": "sleep",
            "isDone": false
          }
        },
        todoItemCount: 3
      }
      assert.deepEqual(expected,user.todos);
    })
    it('should store data with a todos field empty',()=>{
      let user = new User('pranoy');
      user.addNewTodo(1,'home','todays work');
      let expected = {};
      expected[1] =
        {title:'home',
        description:'todays work',
        toDoItems:{},
        todoItemCount:1
      }
      assert.deepEqual(expected,user.todos);
    })
    it('should not store data if title or description is not specified',()=>{
      let user = new User('pranoy');
      user.addNewTodo('home',undefined,'eat\r\nsleep\r\ncode\r\nrepeat');
      let expected = {};
      assert.deepEqual(expected,user.todos);
    })
  })

  describe.skip('getExistingTodo()',()=>{
    it('should return existing todo',()=>{
      let user = new User('pranoy');
      user.addNewTodo('home','todays work');
      let expected = {};
      expected['title'] = 'home';
      expected['description'] = 'todays work';
      expected['toDoItems'] = {};
      expected['todoItemCount'] = 1;
      assert.deepEqual(user.getExistingTodo(1),expected);
    })
  })
})
