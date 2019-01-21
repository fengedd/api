import ratingEstimate from './performance-rating-estimator';
import { getAccountSummary } from './stratz';

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

async function playerSummaryTimeProcessor(time) {
  try {
    const { rankMatches, laneMatches, gameModeMatches } = time;
    return {
      rating: ratingEstimate(rankMatches),
      lowPrioGames: lowPrioGamesCount(gameModeMatches),
      jungleGames: jungleGamesCount(laneMatches),
    };
  } catch (err) {
    console.error(err);
  }
}
// eslint-disable-next-line import/prefer-default-export
export async function playerAccountSummaryProcessor(accountId) {
  try {
    const stratzAccountSummary = await getAccountSummary(accountId);
    const { oneMonth, sixMonths, allTime } = stratzAccountSummary;
    return {
      oneMonth: await playerSummaryTimeProcessor(oneMonth),
      sixMonths: await playerSummaryTimeProcessor(sixMonths),
      allTime: await playerSummaryTimeProcessor(allTime),
    };
  } catch (err) {
    console.error(err);
  }
}
