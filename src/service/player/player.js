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

async function player(accountId) {
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

    // console.log(promises);
    const { 0: stratzResponse, 1: odResponse } = promises;
    const { 0: playerInfo, 1: playerAccountSummary } = stratzResponse;
    const { 0: wordCloud, 1: peers } = odResponse;

    const res = generalInfo(playerInfo, accountId);
    res.playerStrength = playerStrength(playerAccountSummary, playerInfo);

    if (openDotaAvail) {
      res.toxic = toxicInfo(wordCloud, playerAccountSummary);
      res.peers = peers;
    }

    return res;
  } catch (error) {
    return {
      id: null,
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
  }
}

player(30).then(v => console.log(v));
export { player as default };
