import processWordCloud from './processor/processWordCloud';
import processPlayerInfo from './processor/processPlayerInfo';
import processPlayerAccountSummary from './processor/processAccountSummary';
import processPeers from './processor/processPeers';

function toxicInfo(wordCloud, playerAccountSummary) {
  const lowPrioGames = JSON.parse(JSON.stringify(playerAccountSummary));
  delete lowPrioGames.oneMonth.rating;
  delete lowPrioGames.sixMonths.rating;
  delete lowPrioGames.allTime.rating;

  return {
    words: wordCloud,
    lowPrioGames,
  };
}

function playerStrength(playerAccountSummary, playerInfo) {
  const {
    oneMonth: { rating: oneMonth },
    sixMonths: { rating: sixMonths },
    allTime: { rating: allTime },
  } = playerAccountSummary;

  const { rank, previousRank, leaderBoardRank } = playerInfo;

  return {
    rank,
    previousRank,
    leaderBoardRank,
    estimatedRank: {
      oneMonth,
      sixMonths,
      allTime,
    },
  };
}

function generalInfo(playerInfo, accountId) {
  const {
    avatarFull,
    name,
    profileUrl,
    isAnonymous,
    firstMatchDate,
    names,
  } = playerInfo;

  return {
    id: accountId,
    name,
    profileUrl,
    avatarFull,
    firstMatchDate,
    isAnonymous,
    names,
  };
}

async function playerCleanUp(accountId) {
  const promises = await Promise.all([
    processPlayerInfo(accountId),
    processPlayerAccountSummary(accountId),
    processWordCloud(accountId),
    processPeers(accountId),
  ]);

  const {
    0: playerInfo,
    1: playerAccountSummary,
    2: wordCloud,
    3: peers,
  } = promises;

  const res = generalInfo(playerInfo, accountId);
  res.toxic = toxicInfo(wordCloud, playerAccountSummary);
  res.playerStrength = playerStrength(playerAccountSummary, playerInfo);
  res.peers = peers;

  return res;
}
async function player(accountId) {
  return playerCleanUp(accountId);
}

export { player as default };
