/* eslint-disable no-param-reassign */
function getFriends(player) {
  return player.with_games > player.against_games;
}

function getPeersAnalysis(obj) {
  const list = obj;
  const friends = [];
  const enemies = [];
  list.forEach(player => {
    delete player.with_gpm_sum;
    delete player.with_xpm_sum;

    if (getFriends(player)) {
      friends.push(player);
    } else {
      enemies.push(player);
    }
  });

  return { friends, enemies };
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
module.exports = { getPeersAnalysis };
