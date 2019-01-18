const stratz = require('./stratz');
const { cleanUpPlayerInfo } = require('./player');
async function playerInfoProcessor(accountId) {
  try {
    const stratzAccountInfo = await stratz.getAccountInfo(accountId);
    const cleanedUpInfo = cleanUpPlayerInfo(stratzAccountInfo);
    return cleanedUpInfo;
  } catch (err) {
    console.error(err);
  }
}
exports.playerInfoProcessor = playerInfoProcessor;
