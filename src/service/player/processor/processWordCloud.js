/**
 * Player word cloud processor.
 */

import franc from 'franc';
import * as swearjar from 'swearjar';
import { getWordCloud } from '../../opendota/opendota';

function profanity(obj) {
  const typedWords = obj.my_word_counts;
  const score = {
    inappropriate: 0,
    sexual: 0,
    insult: 0,
    discriminatory: 0,
    blasphemy: 0,
    neutral: 0,
  };

  Object.entries(typedWords).forEach(e => {
    const word = e[0];
    const freq = e[1];
    if (swearjar.profane(word)) {
      const card = swearjar.scorecard(word);
      Object.entries(card).forEach(s => {
        score[s[0]] += freq;
      });
    } else {
      score.neutral += 1;
    }
  });

  return score;
}

function language(obj) {
  const typedWords = Object.keys(obj.my_word_counts).join(' ');
  return franc(typedWords);
}

function getWordCloudAnalysis(json) {
  return {
    profanity: profanity(json),
    language: language(json),
  };
}

// eslint-disable-next-line import/prefer-default-export
async function processWordCloud(accountId) {
  try {
    // twitch regex ((tw(\s|\.tv)|twitch(\s|\.tv|\/)|t?\.tv)(\/|\s)?))
    const wordCloud = await getWordCloud(accountId);
    return getWordCloudAnalysis(wordCloud);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { processWordCloud as default };
