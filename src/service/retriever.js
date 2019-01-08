const utility = require('../utils/utility');
const async = require('async');
/**
 *
 */

function getWordCloud(accountId) {
  const container = utility.generateJob('api_word_cloud_od', {
    account_id: accountId,
  });

  const res = utility.getData(container.url, null);
  return res;
}

function getPeers(accountId) {
  const container = utility.generateJob('api_peers_od', {
    account_id: accountId,
  });

  const res = utility.getData(container.url, null);
  return res;
}

function getCounts(accountId) {
  const container = utility.generateJob('api_counts_od', {
    account_id: accountId,
  });

  const res = utility.getData(container.url, null);
  return res;
}

const HistogramEnum = { pings: 'pings', apm: 'actions_per_min', eff: 'eff' };

function getHistogramEff(accountId) {
  return getHistogram(accountId, HistogramEnum.eff);
}

function getHistogramApm(accountId) {
  return getHistogram(accountId, HistogramEnum.apm);
}

function getHistogramPings(accountId) {
  return getHistogram(accountId, HistogramEnum.pings);
}

function getHistogram(accountId, cat) {
  const container = utility.generateJob('api_histogram_od', {
    account_id: accountId,
    histogramCategory: cat,
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
// getAccountSummary(244442223).then(val => console.log(val));
// getHistogramApm(244442223).then(val => console.log(val));

module.exports = { getAccountInfo, getWordCloud, getAccountSummary };
