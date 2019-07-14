'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es.array.slice');
var express = _interopDefault(require('express'));
require('core-js/modules/es.symbol');
require('core-js/modules/es.symbol.description');
require('core-js/modules/es.array.concat');
require('core-js/modules/es.array.filter');
require('core-js/modules/es.array.find');
require('core-js/modules/es.array.find-index');
require('core-js/modules/es.array.reduce');
require('core-js/modules/es.date.now');
require('core-js/modules/es.date.to-string');
require('core-js/modules/es.object.to-string');
require('core-js/modules/es.parse-int');
require('core-js/modules/es.regexp.to-string');
require('regenerator-runtime/runtime');
require('core-js/modules/es.promise');
var fs = _interopDefault(require('fs'));
require('path');
var bodyParser = _interopDefault(require('body-parser'));
require('colors');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var FILE_NAME = './db/todos.json';
var checkDB = function checkDB() {
  if (!fs.existsSync('./db')) {
    fs.mkdirSync('./db');
    console.log('First time running? Trying to create a database file for you...');
    fs.writeFileSync(FILE_NAME, '[]');
    console.log('Done!');
  }
};
var getTodos = function getTodos() {
  return new Promise(function (resolve, reject) {
    fs.readFile(FILE_NAME, 'utf8', function (error, data) {
      if (error) {
        console.error("An error occurred when trying to read the data : ".concat(error));
        return reject();
      }

      var todos = JSON.parse(data);
      resolve(todos || []);
    });
  });
};
var saveTodos = function saveTodos(todos) {
  return new Promise(function (resolve, reject) {
    var data = JSON.stringify(todos);
    fs.writeFile(FILE_NAME, data, function (error) {
      if (error) {
        console.error("An error occurred when trying to write the data: ".concat(error));
        return reject();
      }

      resolve();
    });
  });
};

var router = (function (app) {
  app.get('/todo',
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(request, response) {
      var todos;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getTodos();

            case 2:
              todos = _context.sent;
              response.send(todos);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  app.get('/todo/:todoId',
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(request, response) {
      var todos, todo;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return getTodos();

            case 2:
              todos = _context2.sent;
              todo = todos.find(function (todo) {
                return todo.id === request.params.todoId;
              });
              response.send(todo || {});

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  app.post('/todo',
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(request, response) {
      var _request$body, _request$body$id, id, title, description, _request$body$timeSta, timeStamp, newTodo, todos, existingIndex;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _request$body = request.body, _request$body$id = _request$body.id, id = _request$body$id === void 0 ? 0 : _request$body$id, title = _request$body.title, description = _request$body.description, _request$body$timeSta = _request$body.timeStamp, timeStamp = _request$body$timeSta === void 0 ? Date.now() : _request$body$timeSta;
              newTodo = {
                id: parseInt(id),
                title: title,
                description: description,
                timeStamp: timeStamp
              };
              _context3.next = 4;
              return getTodos();

            case 4:
              todos = _context3.sent;
              existingIndex = todos.findIndex(function (existingTodo) {
                return existingTodo.id === newTodo.id;
              });

              if (existingIndex > -1) {
                todos[existingIndex] = newTodo;
              } else {
                newTodo.id = todos.reduce(function (highestId, todo) {
                  if (todo.id > highestId) {
                    return todo.id;
                  }

                  return highestId;
                }, 0);
                newTodo.id++;
                todos = [].concat(_toConsumableArray(todos), [newTodo]);
              }

              saveTodos(todos);
              response.send(newTodo.id.toString());

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  app["delete"]('/todo/:todoId',
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(request, response) {
      var id, todos, remainingTodos;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = parseInt(request.params.todoId);
              _context4.next = 3;
              return getTodos();

            case 3:
              todos = _context4.sent;
              remainingTodos = todos.filter(function (todo) {
                return todo.id !== id;
              });
              saveTodos(remainingTodos);
              response.send('ok');

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
  app.get('/', function (request, response) {
    response.send('This is the todo end point api!');
  });
});

var init = function init(args) {
  var app = express();

  var _args = _slicedToArray(args, 1),
      _args$ = _args[0],
      PORT = _args$ === void 0 ? 3000 : _args$;

  checkDB();
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  router(app);
  app.listen(PORT, function () {
    console.clear();
    console.log('TODO-ENDPOINT'.underline.green);
    console.log('Thank you for using todo-endpoint, a development server for basic todo experiments!'.green);
    console.log('The server actions available are GET, POST and DELETE.'.green);
    console.log('');
    console.log('To GET a specific post, use this syntax: /todo/:todoId, such as /todo/5.'.green);
    console.log('To POST a post, make a post to /todo and append a x-www-form-urlencoded body with the todo in the format of {id, title, description, timeStamp}. "id" is optional and if set will cause an update. "timeStamp" is also optional and will be filled in for you if omitted.'.green);
    console.log('To DELETE a post, use this syntax: /todo/:todoId, such as /todo/12.'.green);
    console.log('');
    console.log("Server is now running on http://localhost:".concat(PORT, "/todo"));
  });
};

module.exports = {
  init: function init$1() {
    init(process.argv.slice(2));
  }
};
