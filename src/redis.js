/**
 * Interface to Redis Client
 */

/* @flow */

import redis from 'redis';
import bluebird from 'bluebird';
import errors from './errors';
/*
const redis = require('redis');
const errors = require('./errors');
const bluebird = require('bluebird');
*/
console.log('connecting %s', process.env.REDIS_URL);
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(process.env.REDIS_URL);

client.on('error', errors.report); // eslint-disable-line no-console

module.exports = client;
