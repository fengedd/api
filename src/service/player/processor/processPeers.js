import { getPeers } from '../../opendota/opendota';

/* eslint-disable no-param-reassign */
function isFriend(player) {
  return player.with_games > player.against_games;
}

function enemyFriendTopTenCounter(obj) {
  const list = obj;
  const friends = [];
  const enemies = [];
  list.forEach(player => {
    delete player.with_gpm_sum;
    delete player.with_xpm_sum;

    if (isFriend(player)) {
      friends.push(player);
    } else {
      enemies.push(player);
    }
  });

  friends.sort((a, b) => b.with_games - a.with_games);
  enemies.sort((a, b) => b.against_games - a.against_games);

  return { friends: friends.slice(0, 10), enemies: enemies.slice(0, 10) };
}

// eslint-disable-next-line import/prefer-default-export
async function processPeers(accountId) {
  try {
    const peersPayload = await getPeers(accountId);
    return enemyFriendTopTenCounter(peersPayload);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { processPeers as default };
