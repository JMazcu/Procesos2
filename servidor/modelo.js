const datos = require("./cad.js");

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