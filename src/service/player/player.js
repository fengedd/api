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
    toxic: { words: wordCloud, lowPrioGames },
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
    playerStrength: {
      rank,
      previousRank,
      leaderBoardRank,
      estimatedRank: {
        oneMonth,
        sixMonths,
        allTime,
      },
    },
  };
}

function generalInfo(playerInfo) {
  const {
    avatarFull,
    name,
    profileUrl,
    isAnonymous,
    firstMatchDate,
    names,
  } = playerInfo;

  return {
    name,
    profileUrl,
    avatarFull,
    firstMatchDate,
    isAnonymous,
    names,
  };
}

async function player(accountId) {
  const res = {
    id: accountId,
    name: null,
    profileUrl: null,
    avatarFull: null,
    firstMatchDate: null,
    isAnonymous: null,
    names: null,
    playerStrength: null,
    toxic: null,
    peers: null,
  };

  try {
    const stratzPromises = Promise.all([
      processPlayerInfo(accountId),
      processPlayerAccountSummary(accountId),
    ]).catch(err => {
      throw err;
    });

    let openDotaAvail = true;

    const odPromises = Promise.all([
      processWordCloud(accountId),
      processPeers(accountId),
    ]).catch(err => {
      openDotaAvail = false;
      console.error(err);
    });

    const promises = await Promise.all([stratzPromises, odPromises]);

    const { 0: stratzResponse, 1: odResponse } = promises;
    const { 0: playerInfo, 1: playerAccountSummary } = stratzResponse;
    const { 0: wordCloud, 1: peers } = odResponse;

    Object.assign(res, generalInfo(playerInfo));
    Object.assign(res, playerStrength(playerAccountSummary, playerInfo));

    if (openDotaAvail) {
      Object.assign(res, toxicInfo(wordCloud, playerAccountSummary));
      res.peers = peers;
    }

    return res;
  } catch (error) {
    console.error(error);
    return res;
  }
}

export { player as default };
