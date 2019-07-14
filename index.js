import app from './src/index';

module.exports = {
  init: () => {
    app(process.argv.slice(2));
  }
}