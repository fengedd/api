import ratingEstimate from './utility/performance-rating-estimator';
import { getAccountSummary } from '../../stratz/stratz';

function jungleGamesCount(arr) {
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

function lowPrioGamesCount(arr) {
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

function processPlayerTimeSummary(time) {
  const { rankMatches, laneMatches, gameModeMatches } = time;
  return {
    rating: ratingEstimate(rankMatches),
    lowPrioGames: lowPrioGamesCount(gameModeMatches),
    jungleGames: jungleGamesCount(laneMatches),
  };
}
// eslint-disable-next-line import/prefer-default-export
export async function processPlayerAccountSummary(accountId) {
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
