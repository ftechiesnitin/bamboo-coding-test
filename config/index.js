const dotenv = require('dotenv');
const _ = require('lodash');

// Load environment variables from .env file
dotenv.load();

let config = module.exports = {};

// App configuration
config.APP_ENV = _.get(process, 'env.APP_ENV', 'DEV');
config.PORT = _.get(process, 'env.APP_PORT', 4000);

// REDIS Config
config.ELASTIC = {
  HOST: _.get(process, 'env.ELASTIC_HOST', ''),
  PORT: _.get(process, 'env.ELASTIC_PORT', 9200),
};
