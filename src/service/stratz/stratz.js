/**
 * Worker interfaces with external Stratz API
 */
const utility = require('../utils/utility');

export function getAccountInfo(accountId) {
  const container = utility.generateJob('api_account_info_stratz', {
    account_id: accountId,
  });

  const res = utility.getData(container.url, null);
  return res;
}

export function getAccountSummary(accountId) {
  const container = utility.generateJob('api_account_summary_stratz', {
    account_id: accountId,
  });

  const res = utility.getData(container.url, null);
  return res;
}

module.exports = { getAccountInfo, getAccountSummary };
