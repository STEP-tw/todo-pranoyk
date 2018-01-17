const User = require('../lib/user.js');
const chai = require('chai');
let assert = chai.assert;

describe('User',()=>{
  describe('addNewTodo()',()=>{
    it('should add new todo in users all todos',()=>{
      let user = new User('pranoy');
      user.addNewTodo('home','todays work','eat\r\nsleep\r\ncode\r\nrepeat');
      let expected = {};
      expected[1] =
        {title:'home',
        description:'todays work',
        toDoItems:['eat','sleep','code','repeat']
      }
      assert.deepEqual(expected,user.todos);
    })
    it('should store data with a todos field empty',()=>{
      let user = new User('pranoy');
      user.addNewTodo('home','todays work');
      let expected = {};
      expected[1] =
        {title:'home',
        description:'todays work',
        toDoItems:[]
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

  describe('getExistingTodo()',()=>{
    it('should return existing todo',()=>{
      let user = new User('pranoy');
      user.addNewTodo('home','todays work');
      let expected = {};
      expected['title'] = 'home';
      expected['description'] = 'todays work';
      expected['toDoItems'] = [];
      assert.deepEqual(user.getExistingTodo(1),expected);
    })
  })

  describe('editExistingTodo()',()=>{
    it('should edit existing todo with given fields',()=>{
      let user = new User('pranoy');
      user.addNewTodo('home','todays work','eat\r\nsleep\r\ncode\r\nrepeat');
      user.editExistingTodo(1,'Home',`Today's work`,'eat\r\ncode\r\nsleep\r\nrepeat');
      let expected = {};
      expected[1] =
        {title:'Home',
        description:`Today's work`,
        toDoItems:['eat','code','sleep','repeat']
        }
      assert.deepEqual(expected,user.todos);
    })
  })
})
