const pino = require('pino')();
const _ = require('lodash');
const cfg = require('../config');

const Utils = {

  error: (errMsg, statusCode, err) => {
    let json = {
      status: false,
      error: {
        code: statusCode,
        msg: errMsg
      }
    };

    pino.error(err, errMsg);
    return json;
  },

  responseSuccess: (res, data) => {
    res.status(200);
    return res.json(data);
  },

  responseError: (res, err, errMsg) => {
    res.status(500);
    return res.json(Utils.error(errMsg || 'Internal Server Error.', 500, err));
  },

  responseErrorNotFound: (res, err, errMsg) => {
    res.status(404);
    return res.json(Utils.error(errMsg || 'Resource Not Found.', 404, err));
  },

  responseErrorUnauthorized: (res, err, errMsg) => {
    res.status(401);
    return res.json(Utils.error(errMsg || 'Un-Authorised Access.', 401, err));
  },

  responseErrorForbidden: (res, err, errMsg) => {
    res.status(403);
    return res.json(Utils.error(errMsg || 'Forbidden.', 403, err));
  },

  responseErrorBadRequest: (res, err, errMsg) => {
    res.status(400);
    return res.json(Utils.error(errMsg || 'Bad Request', 400, err));
  },

  responseErrorConflict: (res, err, errMsg) => {
    res.status(409);
    return res.json(Utils.error(errMsg || 'conflict', 409, err));
  },

  formatRes: (data) => {
    let results = [];
    _.get(data, 'hits.hits', []).forEach(param => {
      let format = {};
      Object.keys(param._source).forEach(key => {
        format[key] = param['_source'][key];
      });
      results.push({...format, ...{ score: (param._score/100) }});
    })

    return results;
  }

}

module.exports = Utils;
