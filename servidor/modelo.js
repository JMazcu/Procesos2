const datos = require("./cad.js");
const correo = require("./email.js");
const bcrypt = require("bcrypt");

function Sistema() {

    this.usuarios = {};
    this.cad = new datos.CAD();

    this.cad.conectar(function (db) {
        console.log("Conectado a Mongo Atlas");
    });

    this.agregarUsuario = function (nombre) {
        let res = { nombre: -1 }
        if (!this.usuarios[nombre]) {
            this.usuarios[nombre] = new Usuario(nombre);
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
            else
            {
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
        return this.usuarios;
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
}

function Usuario(nombre) {
    this.nombre = nombre;
}

module.exports.Sistema = Sistema;