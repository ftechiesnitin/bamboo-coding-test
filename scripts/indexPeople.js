const csv = require('fast-csv');
const fs = require('fs-extra');

const elastic = require('../db/elasticDao');

const indexName = 'people',
  indexType = 'investor';

let i = 1,
  csvData = [];

csv
  .fromPath('./scripts/data.csv', {
    headers: true,
    objectMode: true
  })
  .on("data", (data) => {
    data.monthlyIncome = data['monthly income'];
    delete data['monthly income'];
    csvData.push({
      index: {
        _index: indexName,
        _type: indexType,
        _id: i
      }
    });

    csvData.push(data);
    i++;
  })
  .on("end", () => {
    elastic.ping()
      .then(() => elastic.createIndex(indexName))
      .then(() => elastic.bulkOps(csvData))
      .catch((err) => {
        console.log('err', err);
      });
  });
