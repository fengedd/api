import { processWordCloud } from './processor/processWordCloud';
import { processPlayerInfo } from './processor/processPlayerInfo';
import { processPlayerAccountSummary } from './processor/processAccountSummary';
import { processPeers } from './processor/processPeers';

function player(accountId) {
  return Promise.all([
    processPlayerInfo(accountId),
    processPlayerAccountSummary(accountId),
    processPeers(accountId),
    processWordCloud(accountId),
  ]);
}

export { player as default };
