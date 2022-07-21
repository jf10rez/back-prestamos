const passport = require("passport");
const strategy = require("passport-facebook");

const FacebookStrategy = strategy.Strategy;


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://localhost:4000/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    return done(null, profile);
  }
));