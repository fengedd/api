/**
 * Worker interfaces with OpenDota API
 */

const utility = require('../utils/utility');

const HistogramEnum = { pings: 'pings', apm: 'actions_per_min', eff: 'eff' };

function getAllOpenDota(accountId) {
  const wordcloud = getWordCloud(accountId);
  const peers = getPeers(accountId);
  const counts = getCounts(accountId);
  const eff = getHistogramEff(accountId);
  const apm = getHistogramApm(accountId);
  const pings = getHistogramPings(accountId);
  return Promise.all([wordcloud, peers, counts, eff, apm, pings]);
}

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

module.exports = { getAllOpenDota, getWordCloud, getPeers };
