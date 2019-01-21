import { getWordCloud, getPeers } from './opendota';
import { getWordCloudAnalysis } from './profanity-analyzer';
import {getPeersAnalysis} from './peer-analyzer'
import { playerInfoProcessor } from './playerInfoProcessor';
import { playerAccountSummaryProcessor } from './playerAccountSummaryProcessor';

async function wordCloudProcessor(accountId) {
  try {
    // twitch regex ((tw(\s|\.tv)|twitch(\s|\.tv|\/)|t?\.tv)(\/|\s)?))
    const wordCloud = await getWordCloud(accountId);
    return { getWordCloudAnalysis(wordCloud) };
  } catch (err) {
    console.error(err);
  }
}

async function peersProcessor(accountId) {
  try {
    const peersPayload = await getPeers(accountId);
    return { getPeersAnalysis(peersPayload) };
  } catch (err) {
    console.error(err);
  }
}

function getPlayer(accountId) {
  // Async twitch stream analysis
  return Promise.all([
    wordCloudProcessor(accountId),
    peersProcessor(accountId),
    playerInfoProcessor(accountId),
    playerAccountSummaryProcessor(accountId),
  ]);
}

getPlayer(244442223).then(v => console.log(v));
