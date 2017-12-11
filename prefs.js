const path = require('path');

const data = path.join(__dirname, 'data');
const MAX_SIZE = 2e+7;
process.env.TOKEN = require('./token');


module.exports.init = () => {
  global.prefs = {
    data,
    MAX_SIZE
  }
};
