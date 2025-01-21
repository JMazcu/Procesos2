const fs = require("fs");
const express = require('express');
const app = express();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
require("./servidor/passport-setup.js");
const modelo = require("./servidor/modelo.js");

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/"));

app.use(cookieSession({
    name: 'Sistema',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new
    LocalStrategy({ usernameField: "email", passwordField: "password" },
        function (email, password, done) {
            sistema.loginUsuario({ "email": email, "password": password }, function (user) {
                return done(null, user);
            });
        }
    ));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let sistema = new modelo.Sistema();

app.get("/", function (request, response) {
    var contenido = fs.readFileSync(__dirname + "/cliente/index.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get("/agregarUsuario/:nombre", function (request, response) {
    let nick = request.params.nombre;
    let res = sistema.agregarUsuario(nick);
    response.send(res);
});

app.get("/obtenerUsuarios", function (request, response) {
    let res = sistema.obtenerUsuarios();
    response.send(res);
});

app.get("/usuarioActivo/:nombre", function (request, response) {
    let nick = request.params.nombre;
    let res = sistema.usuarioActivo(nick);
    response.send(res);
});

app.get("/numeroUsuarios", function (request, response) {
    let res = sistema.numeroUsuarios();
    response.send(res);
});

app.get("/eliminarUsuario/:nombre", function (request, response) {
    let nick = request.params.nombre;
    let res = sistema.eliminarUsuario(nick);
    response.send(res);
});

app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/fallo' }),
    function (req, res) {
        res.redirect('/good');
    }
);

app.post('/oneTap/callback',
    passport.authenticate('google-one-tap', { failureRedirect: '/fallo' }),
    function (req, res) {
        res.redirect('/good');
    }
);

app.get("/good", function (request, response) {
    let email = request.user.emails[0].value;
    sistema.usuarioGoogle({"email": email }, function (obj) {
        response.cookie('nombre', obj.email);
        response.redirect('/');
    });
});

app.get("/fallo", function (request, response) {
    response.send({ nombre: "nook" })
});

app.post("/registrarUsuario", function (request, response) {
    sistema.registrarUsuario(request.body, function (res) {
        response.send({ "nombre": res.email });
    });
});

app.get("/confirmarUsuario/:email/:key", function (request, response) {
    let email = request.params.email;
    let key = request.params.key;
    sistema.confirmarUsuario({ "email": email, "key": key }, function (usr) {
        if (usr.email != -1) {
            response.cookie('nombre', usr.email);
        }
        response.redirect('/');
    });
});

app.post('/loginUsuario', passport.authenticate("local", {failureRedirect: "/fallo",successRedirect: "/ok"})
);

app.get("/ok", function (request, response) {
    response.send({ nombre: request.user.email })
});

app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});