const profanity = require('./profanity-analyzer');
const opendota = require('./opendota');
const stratz = require('./stratz');

function callOdStratz(accountId) {
  return opendota.getAllOpenDota(accountId);
}

async function profanityProcessor(accountId) {
  try {
    const wordCloud = await opendota.getWordCloud(accountId);
    const profanityScore = await profanity.getProfanityUsage(wordCloud);
    return profanityScore;
  } catch (err) {
    throw err;
  }
}

async function peersProcessor(accountId) {
  try {
  } catch (err) {
    throw err;
  }
}

function getPlayer(accountId) {
  // Async twitch

  const profanityScorePromise = profanityProcessor(accountId);

  // Async OpenDota

  // Async Stratz
  return Promise.all([profanityScorePromise]);
}

getPlayer(244442223).then(v => console.log(v));

// callOdStratz(244442223).then(val => console.log(val));
// getPlayer(1).then(val => console.log(val));
