const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "958785136788-qdefmp1b32jg0k2vqa1066tn9qvu0bpb.apps.googleusercontent.com",
    clientSecret: "contraseñaQueNuncaNadieSabrá",
    callbackURL: "http://localhost:3000/google/callback"

    // Para cuando se despliegue la aplicacion
    //clientID: "958785136788-92ev3k4164sb52fqn998maku6tb13l0l.apps.googleusercontent.com",
    //clientSecret: "clienteSecretoDeEjemplo",
    //callbackURL: "https://procesos2-958785136788.europe-west1.run.app/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));