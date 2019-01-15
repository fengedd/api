/**
 * Player speech profanity analyzer worker
 */
const swearJar = require('swearjar');

/** Calculates the negative sentiment score of a sentence */
function getProfanityUsage(json) {
  const obj = JSON.parse(json);
  return calculatesProfanityUsage(obj);
}

function calculatesProfanityUsage(obj) {
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
    if (swearJar.profane(word)) {
      const card = swearJar.scorecard(word);
      Object.entries(card).forEach(s => {
        score[s[0]] += freq;
      });
    } else {
      score.neutral += 1;
    }
  });

  return score;
}

module.exports = getProfanityUsage;
