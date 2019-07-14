import { getTodos, saveTodos } from './db';
import { relative } from 'path';

export default app => {
  app.get('/todo', async (request, response) => {
    const todos = await getTodos();
    response.send(todos);
  });

  app.get('/todo/:todoId', async (request, response) => {
    const todos = await getTodos();
    const todo = todos.find(todo => todo.id === request.params.todoId);
    response.send(todo || {});
  });

  app.post('/todo', async (request, response) => {
    const { id = 0, title, description, timeStamp = Date.now() } = request.body;
    const newTodo = { id: parseInt(id), title, description, timeStamp };

    let todos = await getTodos();
    let existingIndex = todos.findIndex(
      existingTodo => existingTodo.id === newTodo.id
    );
    if (existingIndex > -1) {
      todos[existingIndex] = newTodo;
    } else {
      newTodo.id = todos.reduce((highestId, todo) => {
        if (todo.id > highestId) {
          return todo.id;
        }
        return highestId;
      }, 0);
      newTodo.id++;
      todos = [...todos, newTodo];
    }

    saveTodos(todos);

    response.send(newTodo.id.toString());
  });

  app.delete('/todo/:todoId', async (request, response) => {
    const id = parseInt(request.params.todoId);
    const todos = await getTodos();
    const remainingTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(remainingTodos);
    response.send('ok');
  });

  app.get('/', (request, response) => {
    response.send('This is the todo end point api!');
  });
};
