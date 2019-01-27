/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */

/**
 * Copyright © 2016-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */


{"id":"86745912","name":"give me coffee im boss","profileUrl":"https://steamcommunity.com/id/77777Il77777i1li1IlIl71IlIlIl/","avatarFull":"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4c/4c237d7457dd3266bc8477eb6cb486af95777018_full.jpg","firstMatchDate":1351293085,"isAnonymous":false,"names":[{"name":"rtz YB`a","count":67},{"name":"rtz","count":36},{"name":"a","count":8},{"name":"Arteezy","count":7},{"name":"REAL_LIFE","count":6},{"name":"bulba in romania pt 2","count":4},{"name":"rts","count":4},{"name":"send me location","count":3},{"name":"LIQUID`BULBA","count":3},{"name":"dasdasdasdasd f","count":3}],"playerStrength":{"rank":80,"previousRank":75,"leaderBoardRank":4,"estimatedRank":{"oneMonth":{"estimatedRank":84,"estimatedIndividualRank":83},"sixMonths":{"estimatedRank":84,"estimatedIndividualRank":81},"allTime":{"estimatedRank":82,"estimatedIndividualRank":84}}},"toxic":{"words":{"profanity":{"inappropriate":51,"sexual":125,"insult":12,"discriminatory":0,"blasphemy":0,"neutral":1967},"language":"eng"},"lowPrioGames":{"oneMonth":{"lowPrioGames":0,"jungleGames":0,"totalGames":28},"sixMonths":{"lowPrioGames":0,"jungleGames":0,"totalGames":323},"allTime":{"lowPrioGames":16,"jungleGames":28,"totalGames":7311}}},"peers":null}

import express from 'express';
import cors from 'cors';
import compression from 'compression';

import path from 'path';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import flash from 'express-flash';
import i18next from 'i18next';
import i18nextMiddleware, {
  LanguageDetector,
} from 'i18next-express-middleware';
import i18nextBackend from 'i18next-node-fs-backend';
import PrettyError from 'pretty-error';

import redis from './redis';
import api from './routes/api';

i18next
  .use(LanguageDetector)
  .use(i18nextBackend)
  .init({
    preload: ['en', 'de'],
    ns: ['common', 'email'],
    fallbackNS: 'common',
    detection: {
      lookupCookie: 'lng',
    },
    backend: {
      loadPath: path.resolve(__dirname, '../locales/{{lng}}/{{ns}}.json'),
      addPath: path.resolve(
        __dirname,
        '../locales/{{lng}}/{{ns}}.missing.json',
      ),
    },
  });

const app = express();

app.set('trust proxy', 'loopback');

app.use(
  cors({
    origin(origin, cb) {
      const whitelist = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : [];
      cb(null, whitelist.includes(origin));
    },
    credentials: true,
  }),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    store: new (connectRedis(session))({ client: redis }),
    name: 'sid',
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  }),
);

app.use(i18nextMiddleware.handle(i18next));

app.use(flash());
app.use(api);

/*
// The following routes are intended to be used in development mode only
if (process.env.NODE_ENV !== 'production') {
  // A route for testing email templates

  app.get('/:email(email|emails)/:template', (req, res) => {
    const message = email.render(req.params.template, { t: req.t, v: 123 });
    res.send(message.html);
  });


  // A route for testing authentication/authorization
  app.get('/', (req, res) => {
    if (req.user) {
      res.send(
        `<p>${req.t('Welcome, {{user}}!', {
          user: req.user.displayName,
        })} (<a href="javascript:fetch('/login/clear', { method: 'POST', credentials: 'include' }).then(() => window.location = '/')">${req.t(
          'log out',
        )}</a>)</p>`,
      );
    } else {
      res.send(
        `<p>${req.t('Welcome, guest!')} (<a href="/login/facebook">${req.t(
          'sign in',
        )}</a>)</p>`,
      );
    }
  });
}
*/

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => {
  process.stderr.write(pe.render(err));
  next();
});

export default app;
