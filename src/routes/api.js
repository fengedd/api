/**
 * API Router
 */

import express from 'express';
import player from '../dispatcher';

const api = new express.Router();

console.log('%s Route API loaded', new Date());

/**
 * Player endpoint
 */
api.get('/api/v1/players/:id', async (req, res) => {
  const accountId = req.params.id;
  try {
    if (isNaN(accountId)) {
      throw Error('400');
    } else {
      res.status(200).send(await player(accountId));
    }
  } catch (err) {
    console.error('%s API Player Endpoint %s', new Date(), err.message);
    res.sendStatus(400).end();
  }
});

module.exports = api;
