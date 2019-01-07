/**
 * Creates a job object for enqueing that contains details of API endpoints to hit
 */

const config = require('../config');
const urllib = require('url');
const request = require('request-promise');

function generateJob(type, payload) {
  const openDotaApiUrl = 'https://api.opendota.com/api';
  const stratzApiUrl = 'https://api.stratz.com/api';
  let apiKey;
  const opts = {
    api_word_cloud() {
      return {
        url: `${openDotaApiUrl}/players/${payload.account_id}/wordcloud`,
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

/*
const handleResponse = (err, res, body) => {
  if (isError(err, res, body)) {
    // invalid response
    if (url.noRetry) {
      return cb(err || 'invalid response');
    }

    // console error

    const backoff = 0;
    return setTimeout(() => {
      getData(url, cb);
    }, backoff);
  }
  if (body.result) {
    //Query fail
    console.log('Query fail');
  }
  return cb(null, body, {
    hostname: parse.host,
  });
};

const isError = (err, res, body) => {
  return (
    err ||
    !res ||
    res.statusCode !== 200 ||
    !body ||
    (!url.raw &&
      !body.result &&
      !body.response &&
      !body.player_infos &&
      !body.teams &&
      !body.game_list &&
      !body.match &&
      !body.data)
  );
};
*/
function getData(u, cb) {
  const delay = Number(config.DEFAULT_DELAY);
  const timeout = 5000;
  const parse = urllib.parse(u, true);
  const openDotaApi = parse.host === 'api.opendota.com';
  const stratzApi = parse.host === 'api.stratz.com';
  const target = urllib.format(parse);
  const options = {
    method: 'GET',
    url: target,
    json: true, // weird take out later
    timeout,
  };
  console.log('%s - getData: %s', new Date(), target);
  const req = request(options);
  return req;

  /*
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  */

  /*
  return setTimeout(() => {
    request(options).then(val => {
      return val;
    }, null);
  }, delay);
  */
}
/*
(err, res, body) => {
        console.log(err + res + body);
*/
module.exports = { generateJob, getData };
