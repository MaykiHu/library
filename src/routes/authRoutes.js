const express = require('express');
const { MongoClient } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('Connected correctly to server'); // eslint-disable-line

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, password };
          const results = await col.insertOne(user);
          console.log(results); // eslint-disable-line
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          console.log(err.stack); // eslint-disable-line
        }
      }());
    });
  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In',
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) { // if user signed in
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}
module.exports = router;
