import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import { checkDB } from './db';
import colors from 'colors';

const init = (args) => {
  const app = express();
  const [PORT = 3000] = args;

  checkDB();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  router(app);

  app.listen(PORT, () => {
    console.clear();
    console.log('TODO-ENDPOINT'.underline.green)
    console.log('Thank you for using todo-endpoint, a development server for basic todo experiments!'.green);
    console.log('The server actions available are GET, POST and DELETE.'.green)
    console.log('');
    console.log('To GET a specific post, use this syntax: /todo/:todoId, such as /todo/5.'.green);
    console.log('To POST a post, make a post to /todo and append a x-www-form-urlencoded body with the todo in the format of {id, title, description, timeStamp}. "id" is optional and if set will cause an update. "timeStamp" is also optional and will be filled in for you if omitted.'.green);
    console.log('To DELETE a post, use this syntax: /todo/:todoId, such as /todo/12.'.green);
    console.log('');
    console.log(`Server is now running on http://localhost:${PORT}/todo`);
  });
};

export default init;