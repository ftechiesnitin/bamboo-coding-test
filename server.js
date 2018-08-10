const express = require("express");

const elasticDao = require('./db/elasticDao');
//initialize API
const api = require('./api');
const cfg = require('./config');

elasticDao.ping()
  .then(() => {
    const app = new express();
    // Here you might use middleware, attach routes, etc.
    app.use('/', api);
    // Don't expose our internal server to the outside.
    app.listen(cfg.PORT, () => {
      console.log("Server is running at port: " + cfg.PORT);
    });
  })
  .catch(err => {
    console.error('Error: elastic search connection failed');
    process.exit(1);
  })
