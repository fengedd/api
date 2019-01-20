/**
 * Performance rating estimator

 * Formula:
 *  T = Total # games;
 *  r = rank i;
 *  t = total # of games at rank i;
 *  w = wins at i;
 *  l = losses at i;

 * Rating Estimate = (1/T) Σ i = 1 to 7  t * (r + 0.5 + 1 * (w - l)/t)
 *
 */

import NormalDistribution from 'normal-distribution';

function convertRatingToRank(rating) {
  let rank = Math.round(rating * 100);
  let medals = rank % 100;
  rank = Math.floor(rank / 100);
  rank = rank >= 9 ? 8 : rank;
  rank = rank.toString();
  if (medals >= 0 && medals < 20) {
    medals = '1';
  } else if (medals >= 20 && medals < 40) {
    medals = '2';
  } else if (medals >= 40 && medals < 60) {
    medals = '3';
  } else if (medals >= 60 && medals < 80) {
    medals = '4';
  } else {
    medals = '5';
  }

  return Number(rank + medals);
}

function calculateRating(arr, isImp) {
  let T = 0;
  const IMP_MEAN = 100;
  const IMP_STD = 20;
  const normalDistImp = new NormalDistribution(IMP_MEAN, IMP_STD);
  const reducer = (accumulator, currVal) => accumulator + currVal;
  let totalRating = arr
    .map(obj => {
      let { id, matchCount, win, imp, ...rest } = obj;
      if (id === 0) return 0;
      if (Number.isNaN(imp) || imp === undefined) imp = 100;
      const zScore = normalDistImp.zScore(imp);
      const loss = matchCount - win;
      const individualWeight = isImp ? 0.5 : 0;
      const winLossWeight = 1 - individualWeight;
      T += matchCount;
      const rating =
        matchCount *
        (id +
          0.5 +
          winLossWeight * ((win - loss) / matchCount) +
          individualWeight * zScore);
      return rating;
    })
    .reduce(reducer);
  totalRating /= T;
  return convertRatingToRank(totalRating);
}

export default function ratingEstimate(arr) {
  const res = { estimatedRank: null, estimatedIndividualRank: null };
  if (arr.length === 0) return res;
  res.estimatedRank = calculateRating(arr, false);
  res.estimatedIndividualRank = calculateRating(arr, true);
  return res;
}

/*
const arr = [
  {
    id: 6,
    matchCount: 31,
    win: 16,
    imp: 100,
    goldPerMinute: 744,
    experiencePerMinute: 676,
    date: 1547672414,
  },
  {
    id: 5,
    matchCount: 117,
    win: 65,
    imp: 100,
    goldPerMinute: 732,
    experiencePerMinute: 662,
    date: 1547669665,
  },
  {
    id: 4,
    matchCount: 6,
    win: 1,
    imp: 86,
    goldPerMinute: 384,
    experiencePerMinute: 365,
    date: 1546559286,
  },
  {
    id: 0,
    matchCount: 1,
    win: 0,
    goldPerMinute: 420,
    experiencePerMinute: 419,
    date: 1545011299,
  },
];

const jean = [
  {
    id: 6,
    matchCount: 52,
    win: 26,
    imp: 89,
    goldPerMinute: 376,
    experiencePerMinute: 304,
    date: 1547611833,
  },
  {
    id: 5,
    matchCount: 19,
    win: 10,
    imp: 95,
    goldPerMinute: 375,
    experiencePerMinute: 326,
    date: 1547528989,
  },
];

const high = [
  {
    id: 6,
    matchCount: 21,
    win: 15,
    goldPerMinute: 1912,
    experiencePerMinute: 1356,
    date: 1533381684,
  },
  {
    id: 5,
    matchCount: 9,
    win: 7,
    imp: 135,
    goldPerMinute: 1560,
    experiencePerMinute: 1275,
    date: 1533379613,
  },
  {
    id: 7,
    matchCount: 5,
    win: 2,
    goldPerMinute: 1714,
    experiencePerMinute: 1341,
    date: 1533355153,
  },
  {
    id: 4,
    matchCount: 6,
    win: 5,
    imp: 192,
    goldPerMinute: 930,
    experiencePerMinute: 770,
    date: 1530427833,
  },
];

const num1 = [
  {
    id: 8,
    matchCount: 855,
    win: 532,
    imp: 112,
    goldPerMinute: 610,
    experiencePerMinute: 602,
    date: 1546677724,
  },
  {
    id: 7,
    matchCount: 573,
    win: 411,
    imp: 124,
    goldPerMinute: 639,
    experiencePerMinute: 649,
    date: 1546491199,
  },
  {
    id: 6,
    matchCount: 40,
    win: 34,
    imp: 145,
    goldPerMinute: 752,
    experiencePerMinute: 767,
    date: 1542730762,
  },
  {
    id: 0,
    matchCount: 5804,
    win: 3328,
    imp: 116,
    goldPerMinute: 576,
    experiencePerMinute: 572,
    date: 1542370095,
  },
  {
    id: 4,
    matchCount: 3,
    win: 3,
    imp: 178,
    goldPerMinute: 1497,
    experiencePerMinute: 1318,
    date: 1516047970,
  },
  {
    id: 5,
    matchCount: 7,
    win: 7,
    imp: 132,
    goldPerMinute: 864,
    experiencePerMinute: 809,
    date: 1503397067,
  },
  {
    id: 3,
    matchCount: 4,
    win: 4,
    imp: 231,
    goldPerMinute: 1108,
    experiencePerMinute: 1015,
    date: 1482920030,
  },
];

const yond = [
  {
    id: 3,
    matchCount: 13,
    win: 13,
    imp: 225,
    goldPerMinute: 734,
    experiencePerMinute: 658,
    date: 1547052963,
  },
  {
    id: 2,
    matchCount: 37,
    win: 36,
    imp: 224,
    goldPerMinute: 810,
    experiencePerMinute: 686,
    date: 1545578061,
  },
];
console.log(ratingEstimate(arr));
console.log(ratingEstimate(jean));
console.log(ratingEstimate(high));
console.log(ratingEstimate(yond));
console.log(ratingEstimate(num1));
*/
