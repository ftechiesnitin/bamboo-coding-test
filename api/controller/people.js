const utils = require('../../common/utils');
const peopleDao = require('../../dao/peopleDao');

module.exports = {

  findPeople: (req, res) => {
    let params = {},
        keys = ['age', 'latitude', 'longitude', 'name', 'monthlyIncome', 'experienced'];

    keys.forEach(key => {
      if(req.query[key]) params[key] = req.query[key];
    });

    peopleDao.search(params)
      .then((results) => utils.responseSuccess(res, {peopleLikeYou: results}))
      .catch((err) =>  utils.responseError(res, err));
  },

};
