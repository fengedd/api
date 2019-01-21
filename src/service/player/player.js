import { processWordCloud } from './processor/processWordCloud';
import { processPlayerInfo } from './processor/processPlayerInfo';
import { processPlayerAccountSummary } from './processor/processAccountSummary';
import { processPeers } from './processor/processPeers';

function getPlayer(accountId) {
  return Promise.all([
    processPlayerInfo(accountId),
    processPlayerAccountSummary(accountId),
    processPeers(accountId),
    processWordCloud(accountId),
  ]);
}

getPlayer(244442223).then(v => console.log(v));
