import { getAccountInfo } from '../../stratz';

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
  } = obj;
  return {
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
}

// eslint-disable-next-line import/prefer-default-export
export async function processPlayerInfo(accountId) {
  try {
    const stratzAccountInfo = await getAccountInfo(accountId);
    return cleanUpPlayerInfo(stratzAccountInfo);
  } catch (err) {
    console.error(err);
  }
}
