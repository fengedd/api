import player from './service/player/player';

function getPlayer(accountId) {
  const notInCache = true;
  if (notInCache) {
    return player(accountId);
  }

  return player(accountId);
}

export { getPlayer as default };
// player(244442223).then(v => console.log(v));
