/**
 * API Router
 */

import player from '../dispatcher';

const express = require('express');
const queries = require('../store/queries');

const api = new express.Router();

console.log('Route API loaded');

/**
 * Player endpoint
 */
api.get('/api/v1/players/:id', async (req, res) => {
  const accountId = req.params.id;
  try {
    // if (!req.params.id) throwError(400, 'Bad Request');
    const result = await player(accountId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

/*
const badRequestError = id => {
  if (Number.isNaN(Number(id))) {
    res.sendStatus(400).json({ error: 'Bad Request' });
  }
};

const throwError = (code, errorType, errorMessage) => error => {
  if (!error) error = new Error(errorMessage || 'Default Error');
  error.code = code;
  error.errorType = errorType;
  throw error;
};

const sendError = (res, status, message) => error => {
  res.status(status || error.status).json({
    type: 'error',
    message: message || error.message,
    error,
  });
};
*/

module.exports = api;
