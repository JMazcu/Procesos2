const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleOneTapStrategy = require("passport-google-one-tap").GoogleOneTapStrategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    // Localhost
    clientID: "958785136788-qdefmp1b32jg0k2vqa1066tn9qvu0bpb.apps.googleusercontent.com",
    clientSecret: "contraseñaDeEjemplo",
    callbackURL: "http://localhost:3000/google/callback"

    // Producción
    //clientID: "958785136788-92ev3k4164sb52fqn998maku6tb13l0l.apps.googleusercontent.com",
    //clientSecret: "contraseñaDeEjemplo",
    //callbackURL: "https://procesos2-958785136788.europe-west1.run.app/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));passport.use(    new GoogleOneTapStrategy(
        {
            // Localhost
            client_id:"958785136788-qdefmp1b32jg0k2vqa1066tn9qvu0bpb.apps.googleusercontent.com",
            clientSecret: "contraseñaDeEjemplo",

            // Producción
            //client_id: "958785136788-92ev3k4164sb52fqn998maku6tb13l0l.apps.googleusercontent.com",
            //clientSecret: "contraseñaDeEjemplo",
            verifyCsrfToken: false,
        },
        function (profile, done) {
            return done(null, profile);
        }
    )
);