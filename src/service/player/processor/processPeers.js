import { getPeers } from '../../opendota';

/* eslint-disable no-param-reassign */
function isFriend(player) {
  return player.with_games > player.against_games;
}

// eslint-disable-next-line import/prefer-default-export
function enemyFriendCounter(obj) {
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

  return { friends, enemies };
}

// eslint-disable-next-line import/prefer-default-export
export async function processPeers(accountId) {
  try {
    const peersPayload = await getPeers(accountId);
    return enemyFriendCounter(peersPayload);
  } catch (err) {
    console.error(err);
  }
}

/*
// eslint-disable-next-line consistent-return
const ex = async () => {
  // eslint-disable-next-line global-require
  try {
    const res = await require('./opendota').getPeers(244442223);
    return res;
  } catch (err) {
    console.error(err);
  }
};

ex().then(val => {
  console.log(getPeersAnalysis(val));
});
*/
