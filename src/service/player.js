import ratingEstimate from './performance-rating-estimator';
import { getWordCloud, getPeers } from './opendota';
import { getWordCloudAnalysis } from './profanity-analyzer';

const stratz = require('./stratz');
const peersAnalyzer = require('./peer-analyzer');

async function wordCloudProcessor(accountId) {
  try {
    // twitch regex ((tw(\s|\.tv)|twitch(\s|\.tv|\/)|t?\.tv)(\/|\s)?))
    const wordCloud = await getWordCloud(accountId);
    const profanityScore = getWordCloudAnalysis(wordCloud);
    return { profanityScore };
  } catch (err) {
    console.error(err);
  }
}

async function peersProcessor(accountId) {
  try {
    const peersPayload = await getPeers(accountId);
    const peers = peersAnalyzer.getPeersAnalysis(peersPayload);
    return { peers };
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

function jungleGamesCalc(arr) {
  let res = { totalGames: null, jungleGames: null };
  if (arr.length === 0) return res;
  let jungleGames = 0;
  let totalGames = 0;
  arr.forEach(e => {
    const isJungleGame = e.id === 4;
    if (isJungleGame) {
      jungleGames = e.matchCount;
    }

    totalGames += e.matchCount;
  });

  res = { totalGames, jungleGames };

  return res;
}

function lowPrioGamesCalc(arr) {
  let res = { totalGames: null, lowPrioGames: null };
  if (arr.length === 0) return res;
  let lowPrioGames = 0;
  let totalGames = 0;
  arr.forEach(e => {
    const isLowPrioGame = e.id === 4;
    if (isLowPrioGame) {
      lowPrioGames = e.matchCount;
    }

    totalGames += e.matchCount;
  });

  res = { totalGames, lowPrioGames };

  return res;
}

async function playerSummaryTimeProcessor(time) {
  const { rankMatches, laneMatches, gameModeMatches } = time;
  try {
    const rating = ratingEstimate(rankMatches);
    const jungleGames = jungleGamesCalc(laneMatches);
    const lowPrioGames = lowPrioGamesCalc(gameModeMatches);
    return { rating, lowPrioGames, jungleGames };
  } catch (err) {
    console.error(err);
  }
}

async function playerAccountSummaryProcessor(accountId) {
  try {
    const stratzAccountSummary = await stratz.getAccountSummary(accountId);
    const { oneMonth, sixMonths, allTime } = stratzAccountSummary;

    const res = {
      oneMonth: await playerSummaryTimeProcessor(oneMonth),
      sixMonths: await playerSummaryTimeProcessor(sixMonths),
      allTime: await playerSummaryTimeProcessor(allTime),
    };

    return res;
  } catch (err) {
    console.error(err);
  }
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
  const profanityScorePromise = wordCloudProcessor(accountId);
  const peersAnalysisPromise = peersProcessor(accountId);
  const playerInfoPromise = playerInfoProcessor(accountId);
  const playerSummaryPromise = playerAccountSummaryProcessor(accountId);

  return Promise.all([
    profanityScorePromise,
    peersAnalysisPromise,
    playerInfoPromise,
    playerSummaryPromise,
  ]);
}

getPlayer(244442223).then(v => console.log(v));

// callOdStratz(244442223).then(val => console.log(val));
// getPlayer(1).then(val => console.log(val));
