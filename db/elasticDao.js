const elasticsearch = require('elasticsearch');
const cfg = require('../config');

class ElasticDao {

  constructor() {
    this.client = new elasticsearch.Client({
      host: cfg.ELASTIC.HOST + ':' + cfg.ELASTIC.PORT,
      log: 'error'
    });
  }

  ping() {
    return new Promise((resolve, reject) => {
      this.client.ping({
        requestTimeout: 3000
      }, (err) => {
        if (err) reject('elastic-down');

        resolve();
      })
    });
  }

  createIndex(name) {
    return new Promise((resolve, reject) => {
      if(!name) reject('index-name-reqired');

      this.client.indices.create({
        index: name
      }, (err, res) => {
        if(err) reject(err);

        resolve(res)
      })
    });
  }

  bulkOps(data) {
    return new Promise((resolve, reject) => {
      if(!data.length) reject('index-name-reqired');

      this.client.bulk({
        body: data
      }, (err, res) => {
        if(err) reject(err);

        resolve(res)
      })
    });
  }

  count(name) {
    return new Promise((resolve, reject) => {
      if(!name) reject('index-name-reqired');

      this.client.count({
        index: name
      }, (err, res) => {
        if(err) reject(err);

        resolve(res)
      })
    });
  }

  search(name, query) {
    return new Promise((resolve, reject) => {
      if(!name) reject('index-name-reqired');
      if(!query) reject('query-reqired');

      this.client.search({
        index: name,
        body: query
      }, (err, res) => {
        if(err) reject(err);

        resolve(res)
      })
    });
  }

}

module.exports = new ElasticDao();
