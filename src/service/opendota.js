/**
 * Worker interfaces with OpenDota API
 */

const utility = require('../utils/utility');

export function getWordCloud(accountId) {
  const container = utility.generateJob('api_word_cloud_od', {
    account_id: accountId,
  });

  const res = utility.getData(container.url, null);
  return res;
}

export function getPeers(accountId) {
  const container = utility.generateJob('api_peers_od', {
    account_id: accountId,
  });

  const res = utility.getData(container.url, null);
  return res;
}

/*
function getCounts(accountId) {
  const container = utility.generateJob('api_counts_od', {
    account_id: accountId,
  });

  const res = utility.getData(container.url, null);
  return res;
}

function getHistogram(accountId, cat) {
  const container = utility.generateJob('api_histogram_od', {
    account_id: accountId,
    histogramCategory: cat,
  });

  const res = utility.getData(container.url, null);
  return res;
}

function getHistogramEff(accountId) {
  return getHistogram(accountId, HistogramEnum.eff);
}

function getHistogramApm(accountId) {
  return getHistogram(accountId, HistogramEnum.apm);
}

function getHistogramPings(accountId) {
  return getHistogram(accountId, HistogramEnum.pings);
}

const HistogramEnum = { pings: 'pings', apm: 'actions_per_min', eff: 'eff' };
*/
