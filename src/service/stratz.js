const utility = require('../utils/utility');

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

module.exports = { getAccountInfo, getAccountSummary };
