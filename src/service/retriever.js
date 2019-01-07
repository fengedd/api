const utility = require('../utils/utility');
const async = require('async');
/**
 *
 */

function getWordCloud(accountId) {
  const container = utility.generateJob('api_word_cloud', {
    account_id: accountId,
  });
  return container;
}

function getPage(url, cb) {
  let res = utility.getData(url, null);
  return res;
}

getPage(getWordCloud(244442223).url, null).then(val => console.log(val));
