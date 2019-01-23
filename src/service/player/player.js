import processWordCloud from './processor/processWordCloud';
import processPlayerInfo from './processor/processPlayerInfo';
import processPlayerAccountSummary from './processor/processAccountSummary';
import processPeers from './processor/processPeers';

async function player(accountId) {
  return Promise.all([
    processPlayerInfo(accountId),
    processPlayerAccountSummary(accountId),
    processPeers(accountId),
    processWordCloud(accountId),
  ]);
}

function toxicInfo(wordCloud, playerAccountSummary) {
  const toxic = JSON.parse(JSON.stringify(playerAccountSummary));
  delete toxic.oneMonth.rating;
  delete toxic.sixMonths.rating;
  delete toxic.allTime.rating;

  return {
    wordCloud,
    toxic,
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

async function playerCleanUp(accountId) {
  /*
  const result = await Promise.all([
    processPlayerInfo(accountId),
    processPlayerAccountSummary(accountId),
    processPeers(accountId),
    processWordCloud(accountId),
  ]);
  */
  // General Info
  const playerInfo = await processPlayerInfo(accountId);
  const playerAccountSummary = await processPlayerAccountSummary(accountId);
  const wordCloud = await processWordCloud(accountId);

  // const peers = processPeers(accountId);

  // Player strength and toxic

  // console.log(ratingAT);
  // Toxic
  toxicInfo(wordCloud, playerAccountSummary);
  playerStrength(playerAccountSummary, playerInfo);

  // return base;
}

playerCleanUp(244442223);

export { player as default };
