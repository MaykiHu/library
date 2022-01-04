const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  }); // Stores user

  passport.deserializeUser((user, done) => {
    done(null, user);
  }); // Retrieves user from session
};
