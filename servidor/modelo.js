const datos = require("./cad.js");
const correo = require("./email.js");
const bcrypt = require("bcrypt");

function Sistema() {

    this.usuarios = {};
    this.partidas = {};
    this.cad = new datos.CAD();

    this.cad.conectar(function (db) {
        console.log("Conectado a Mongo Atlas");
    });

    this.agregarUsuario = function (conjunto) {
        let nombre = conjunto.nombre;
        let res = { nombre: -1 }
        if (!this.usuarios[nombre]) {
            this.usuarios[nombre] = new Usuario(conjunto);
            res.nombre = nombre;
        }
        else {
            console.log("El nick " + nombre + " ya está en uso.");
        }
        return res;
    }

    this.registrarUsuario = function (obj, callback) {
        let modelo = this;
        if (!obj.nombre) {
            obj.nombre = obj.email;
        }
        this.cad.buscarUsuario(obj, async function (usr) {
            if (!usr) {
                obj.key = Date.now().toString();
                obj.confirmada = false;
                let hash = await bcrypt.hash(obj.password, 10);
                obj.password = hash;
                modelo.cad.insertarUsuario(obj, function (res) {
                    callback(res);
                });
                correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
            }
            else {
                callback({ "email": -1 });
            }
        });
    }

    this.confirmarUsuario = function (obj, callback) {
        let modelo = this;
        this.cad.buscarUsuario({ "email": obj.email, "confirmada": false, "key": obj.key }, function (usr) {
            if (usr) {
                usr.confirmada = true;
                modelo.cad.actualizarUsuario(usr, function (res) {
                    callback({ "email": res.email }); //callback(res)
                });
            }
            else {
                callback({ "email": - 1 });
            }
        })
    }


    this.loginUsuario = function (obj, callback) {
        let modelo = this;
        this.cad.buscarUsuario({ "email": obj.email, "confirmada": true }, function (usr) {
            if (!usr) {
                callback({ "email": -1 });
                return -1;
            }
            else {
                bcrypt.compare(obj.password, usr.password, function (err, result) {
                    if (result) {
                        callback(usr);
                        modelo.agregarUsuario(usr);
                    }
                    else {
                        callback({ "email": -1 });
                    }
                });
            }
        });
    }

    this.obtenerUsuarios = function () {
        let cadena = "";
        for (var u in this.usuarios) {
            let usuario = this.usuarios[u];
            cadena += "Nombre: " + usuario.nombre + ", Correo: " + usuario.email + "\n";
        }
        return cadena;
    }

    this.usuarioActivo = function (nombre) {
        res = { "activo": false };
        if (this.usuarios[nombre]) {
            res = { "activo": true };
        }
        return res;
    }

    this.eliminarUsuario = function (nombre) {
        let res = { nombre: -1 }
        if (this.usuarios[nombre]) {
            delete this.usuarios[nombre];
            res = { nombre: "eliminado" };
        }
        return res;
    }

    this.numeroUsuarios = function () {
        return { "num": Object.keys(this.usuarios).length };
    }

    this.usuarioGoogle = function (usr, callback) {
        let sys = this;
        this.cad.buscarOCrearUsuario(usr, function (obj) {
            callback(obj);
            sys.agregarUsuario(obj.email);
        });
    }

    this.crearPartida = function (email) {
        let usr = this.usuarios[email];
        let codigo = this.obtenerCodigo();
        if (usr && !this.partidas[codigo]) {
            let partida = new Partida(codigo, usr);
            this.partidas[codigo] = partida;
            this.unirseAPartida(usr, codigo);
            return codigo
        }
        else { return -1; }
    }

    this.unirseAPartida = function (email, codigo) {
        let usr = this.usuarios[email.nombre];
        let res = false;
        let partida = this.partidas[codigo];
        if (usr && partida) {
            res = partida.asignarJugador(usr);
        }
        return res;
    }

    this.obtenerPartidasDisponibles = function () {
        let lista = [];
        for (var c in this.partidas) {
            let partida = this.partidas[c];
            if (partida.jugadores.length < partida.maxJug) {
                let owner = partida.jugadores[0];
                let codigo = partida.codigo;
                let partDisp = { "owner": owner, "codigo": codigo };
                lista.push(partDisp);
            };
        };
        return lista;
    }

    this.obtenerCodigo = function () {
        let cadena = "QWERTYUIOPASDFGHJKLZXCVBNM0123456789";
        let letras = cadena.split("");
        let maxCadena = cadena.length;
        let codigo = [];
        for (i = 0; i < 6; i++) {
            codigo.push(letras[randomInt(1, maxCadena) - 1]);
        }
        return codigo.join("");
    }

    function randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
}

function Usuario(conjunto) {
    this.email = conjunto.email;
    this.nombre = conjunto.nombre;
}

function Partida(codigo) {
    this.codigo = codigo;
    this.jugadores = [];
    this.maxJug = 2;

    this.asignarJugador = function (usr) {
        if (this.jugadores.length < this.maxJug) {
            let estaDentro = false;
            for (i = 0; i < this.jugadores.length; i++) {
                if (usr.email == this.jugadores[i].email) {
                    estaDentro = true;
                    break;
                }
            }
            if (!estaDentro) {
                this.jugadores.push(usr);
                console.log("Se ha introducido a " + usr + " en la partida " + this.codigo);
            }
            else {
                console.log("No se ha podido entrar en la partida: El usuario ya esta dentro")
            }
        }
        else {
            console.log("No se ha podido entrar en la partida: Partida llena");
        }
    }
}

module.exports.Sistema = Sistema;