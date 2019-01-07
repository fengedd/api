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
  const res = utility.getData(url, null);
  return res;
}

function getAccountInfo(accountId) {
  const container = utility.generateJob('api_player_stratz', {
    account_id: accountId,
  });

  const res = utility.getData(container.url, null);
  return res;
}

function getAccountInfo(accountId) {
  const container = utility.generateJob('api_account_info_stratz', {
    account_id: accountId,
  });

  const res = utility.getData(container.url, null);
  return res;
}

function getAccountSummary(accountId) {
  const container = utility.generateJob('api_account_summary_stratz', {
    account_id: accountId,
  });

  const res = utility.getData(container.url, null);
  return res;
}

// getPage(getWordCloud(244442223).url, null).then(val => console.log(val));
getAccountSummary(244442223).then(val => console.log(val));

module.exports = { getAccountInfo, getWordCloud, getAccountSummary };
