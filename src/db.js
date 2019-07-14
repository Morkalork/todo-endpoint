import fs from 'fs';

const FILE_NAME = './db/todos.json';

export const checkDB = () => {
  if (!fs.existsSync('./db')) {
    fs.mkdirSync('./db');
    console.log('First time running? Trying to create a database file for you...');
    fs.writeFileSync(FILE_NAME, '[]');
    console.log('Done!');
  }
};

export const getTodos = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(FILE_NAME, 'utf8', (error, data) => {
      if (error) {
        console.error(
          `An error occurred when trying to read the data : ${error}`
        );
        return reject();
      }

      const todos = JSON.parse(data);
      resolve(todos || []);
    });
  });
};

export const saveTodos = todos => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(todos);
    fs.writeFile(FILE_NAME, data, error => {
      if (error) {
        console.error(
          `An error occurred when trying to write the data: ${error}`
        );
        return reject();
      }
      resolve();
    });
  });
};
