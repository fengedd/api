import ratingEstimate from './utility/performance-rating-estimator';
import { getAccountSummary } from '../../stratz/stratz';

function gameCount(arr, id) {
  let res = { total: null, count: null };
  if (arr.length === 0) return res;
  let count = 0;
  let total = 0;
  arr.forEach(e => {
    const isGame = e.id === id;
    if (isGame) {
      count = e.matchCount;
    }
    total += e.matchCount;
  });
  res = { total, count };
  return res;
}

function processPlayerTimeSummary(time) {
  const { rankMatches, laneMatches, gameModeMatches } = time;
  return {
    rating: ratingEstimate(rankMatches),
    lowPrioGames: gameCount(gameModeMatches, 4).count,
    jungleGames: gameCount(laneMatches, 4).count,
    totalGames: gameCount(gameModeMatches, 0).total,
  };
}
// eslint-disable-next-line import/prefer-default-export
async function processPlayerAccountSummary(accountId) {
  try {
    const stratzAccountSummary = await getAccountSummary(accountId);
    const { oneMonth, sixMonths, allTime } = stratzAccountSummary;

    return {
      oneMonth: processPlayerTimeSummary(oneMonth),
      sixMonths: processPlayerTimeSummary(sixMonths),
      allTime: processPlayerTimeSummary(allTime),
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { processPlayerAccountSummary as default };
