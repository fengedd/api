import ratingEstimate from './performance-rating-estimator';

const profanity = require('./profanity-analyzer');
const opendota = require('./opendota');
const stratz = require('./stratz');
const peersAnalyzer = require('./peer-analyzer');

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
    const peersResult = await peersAnalyzer.getPeersAnalysis(peers);
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

  // const gameMode = ;
}

async function playerAccountSummaryProcessor(accountId) {
  try {
    const stratzAccountSummary = await stratz.getAccountSummary(accountId);
    const { oneMonth, sixMonths, allTime } = stratzAccountSummary;
    return playerSummaryTimeProcessor(allTime);
    /*
    const {
      rankMatches: RankMatchesOM,
      laneMatches: LaneMatchesOM,
      gameModeMatches: GameModeMatchesOM,
    } = oneMonth;
    const {
      rankMatches: RankMatchesSM,
      laneMatches: LaneMatchesSM,
      gameModeMatches: GameModeMatchesSM,
    } = sixMonths;
    const {
      rankMatches: RankMatchesAT,
      laneMatches: LaneMatchesAT,
      gameModeMatches: GameModeMatchesAT,
    } = allTime;

    const res = {
      oneMonth: ratingEstimate(RankMatchesOM),
      sixMonths: ratingEstimate(RankMatchesSM),
      allTime: ratingEstimate(RankMatchesAT),
    };
    */

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
  // const profanityScorePromise = profanityProcessor(accountId);
  // const peersAnalysisPromise = peersProcessor(accountId);

  // Player Info
  // const playerInfoPromise = playerInfoProcessor(accountId);
  // Player Summary
  const playerSummaryPromise = playerAccountSummaryProcessor(accountId);

  // Player Strength
  // Toxicicity

  // Async OpenDota

  // Async Stratz
  return Promise.all([playerSummaryPromise]);
}

getPlayer(244442223).then(v => console.log(v));

// callOdStratz(244442223).then(val => console.log(val));
// getPlayer(1).then(val => console.log(val));
