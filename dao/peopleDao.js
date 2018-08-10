const elastic = require('../db/elasticDao');
const utils = require('../common/utils');

const indexName = 'people';

class PeopleDao {

  search(data) {

    let query = {
      "query": {
        "bool": {
          "should": [
          ]
        }
      }
    };

    Object.keys(data).forEach(key => {
      let fuzzy = {};
      fuzzy[key] = {
        value: data[key]
      };
      query.query.bool.should.push({
        "fuzzy": fuzzy
      })
    });


    return new Promise((resolve, reject) => {
      elastic.search(indexName, query)
        .then((results) => resolve(utils.formatRes(results)))
        .catch((err) => reject(err));
    });
  }

}

module.exports = new PeopleDao();
