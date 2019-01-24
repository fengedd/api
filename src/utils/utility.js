import urllib from 'url';
import request from 'request-promise';
// import config from '../config';

/**
 * Creates a job object for enqueing that contains details of API endpoints to hit
 */
export function generateJob(type, payload) {
  const openDotaApiUrl = 'https://api.opendota.com/api';
  const stratzApiUrl = 'https://api.stratz.com/api';
  const opts = {
    api_word_cloud_od() {
      return {
        url: `${openDotaApiUrl}/players/${payload.account_id}/wordcloud`,
        title: [type].join(),
        type: 'api',
        payload,
      };
    },

    api_peers_od() {
      return {
        url: `${openDotaApiUrl}/players/${payload.account_id}/peers`,
        title: [type].join(),
        type: 'api',
        payload,
      };
    },

    api_counts_od() {
      return {
        url: `${openDotaApiUrl}/players/${payload.account_id}/counts`,
        title: [type].join(),
        type: 'api',
        payload,
      };
    },

    api_histogram_od() {
      return {
        url: `${openDotaApiUrl}/players/${payload.account_id}/histograms/${
          payload.histogramCategory
        }`,
        title: [type].join(),
        type: 'api',
        payload,
      };
    },

    api_account_info_stratz() {
      return {
        url: `${stratzApiUrl}/v1/Player/${payload.account_id}`,
        title: [type].join(),
        type: 'api',
        payload,
      };
    },

    api_account_summary_stratz() {
      return {
        url: `${stratzApiUrl}/v1/Player/${payload.account_id}/summary`,
        title: [type].join(),
        type: 'api',
        payload,
      };
    },
  };
  return opts[type]();
}

/**
 * Wrapper around HTTP requests that handles:
 * parsing, errors
 */
export function getData(u) {
  // const delay = Number(config.DEFAULT_DELAY);
  const timeout = 5000;
  const parse = urllib.parse(u, true);
  const target = urllib.format(parse);
  const options = {
    method: 'GET',
    url: target,
    json: true,
    resolveWithFullResponse: true,
    timeout,
  };

  console.log('%s - getData: %s', new Date(), target);

  return request(options)
    .then(response => response.body)
    .catch(error => {
      console.error('%s API request Error %s', new Date(), error.statusCode);
      return null;
    });
}
