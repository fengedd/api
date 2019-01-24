import { getAccountInfo } from '../../stratz/stratz';
function cleanUpNames(arr) {
  let res = [];
  if (arr.length === 0) return res;
  const dict = {};
  arr.forEach(e => {
    const { name } = e;
    if (dict[name] === undefined) {
      dict[name] = 1;
    } else {
      dict[name] += 1;
    }
  });

  const sortedArray = [];
  Object.entries(dict).forEach(e => {
    sortedArray.push({ name: e[0], count: e[1] });
  });
  sortedArray.sort((a, b) => b.count - a.count);

  res = sortedArray.slice(0, 10);
  return res;
}

function cleanUpPlayerInfo(obj) {
  const {
    name,
    profileUrl,
    avatarFull,
    rank,
    leaderBoardRank,
    previousRank,
    isAnonymous,
    firstMatchDate,
  } = obj;

  let { names } = obj;

  names = cleanUpNames(names);

  return {
    name,
    profileUrl,
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
async function processPlayerInfo(accountId) {
  try {
    const stratzPlayerInfo = await getAccountInfo(accountId);
    return cleanUpPlayerInfo(stratzPlayerInfo);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { processPlayerInfo as default };
