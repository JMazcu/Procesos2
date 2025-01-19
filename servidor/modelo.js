function Sistema() {

    this.usuarios = {};

    this.agregarUsuario = function (nombre) {
        let res = { "nombre": -1 }
        if (!this.usuarios[nombre]) {
            this.usuarios[nombre] = new Usuario(nombre);
            res.nombre = nombre;
        }
        else {
            console.log("El nick " + nombre + " ya está en uso.");
            res = {"Este usuario ya existe": nombre};
        }
        return res;
    }

    this.obtenerUsuarios = function () {
        return this.usuarios;
    }

    this.usuarioActivo = function (nombre) {
        if (this.usuarios[nombre]) {
            return { "activo": true};
        }
        return { "Activo": false };
    }

    this.eliminarUsuario = function (nombre) {
        if (this.usuarios[nombre]) {
            delete this.usuarios[nombre];
            return { "Eliminado": nombre };
        }
        return { "No existe": nombre };
    }

    this.numeroUsuarios = function () {
        return { "N.º": Object.keys(this.usuarios).length };
    }
}

function Usuario(nombre) {
    this.nombre = nombre;
}

module.exports.Sistema = Sistema;