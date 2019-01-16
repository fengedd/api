const profanity = require('./profanity-analyzer');
const opendota = require('./opendota');
const stratz = require('./stratz');
const peers_analyzer = require('./peer-analyzer');

function callOdStratz(accountId) {
  return opendota.getAllOpenDota(accountId);
}

async function profanityProcessor(accountId) {
  try {
    const wordCloud = await opendota.getWordCloud(accountId);
    const profanityScore = await profanity.getProfanityUsage(wordCloud);
    return profanityScore;
  } catch (err) {
    console.error(err);
  }
}

async function peersProcessor(accountId) {
  try {
    const peers = await opendota.getPeers(accountId);
    const peersResult = await peers_analyzer.getPeersAnalysis(peers);
    return peersResult;
  } catch (err) {
    console.error(err);
  }
}

function cleanUpPlayerInfo(obj) {
  const {
    name,
    profileUrl,
    avatar,
    avatarMedium,
    avatarFull,
    rank,
    leaderBoardRank,
    previousRank,
    isAnonymous,
    firstMatchDate,
    names,
    ...rest
  } = obj;

  const subset = {
    name,
    profileUrl,
    avatar,
    avatarMedium,
    avatarFull,
    rank,
    leaderBoardRank,
    previousRank,
    isAnonymous,
    firstMatchDate,
    names,
  };
  return subset;
}

async function playerInfoProcessor(accountId) {
  try {
    const stratzAccountInfo = await stratz.getAccountInfo(accountId);
    const cleanedUpInfo = cleanUpPlayerInfo(stratzAccountInfo);
    return cleanedUpInfo;
  } catch (err) {
    console.error(err);
  }
}

function getPlayer(accountId) {
  // Async twitch stream analysis
  // const profanityScorePromise = profanityProcessor(accountId);
  // const peersAnalysisPromise = peersProcessor(accountId);
  // Player Info
  const playerInfoPromise = playerInfoProcessor(accountId);
  // Player Strength
  // Toxicicity

  // Async OpenDota

  // Async Stratz
  return Promise.all([playerInfoPromise]);
}

getPlayer(244442223).then(v => console.log(v));

// callOdStratz(244442223).then(val => console.log(val));
// getPlayer(1).then(val => console.log(val));
