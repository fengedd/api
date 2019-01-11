/**
 * API Router
 */
const express = require('express');
const db = require('../db');

const api = new express.Router();

console.log('Route API loaded');

api.get('/players/:id', (req, res) => {
  db('players')
    .select('*')
    .where('id', req.params.id)
    .then(val => res.json(val));
  /*
  db('players')
    .select('*')
    .then(value => {
      res.status(200).json(value);
    });
    */
});

module.exports = api;
