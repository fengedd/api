import player from './service/player/player';
import client from './redis';

async function getPlayer(accountId) {
  const result = await client.getAsync(accountId);

  if (result) {
    console.log('%s Found in cache %s', new Date(), accountId);
    return result;
  }

  const res = await player(accountId);
  client.set(accountId, JSON.stringify(res), 'EX', 10);
  return res;
}

export { getPlayer as default };
// player(244442223).then(v => console.log(v));
