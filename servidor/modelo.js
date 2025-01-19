function Sistema() {

    this.usuarios = {};

    this.agregarUsuario = function (nombre) {
        this.usuarios[nombre] = new Usuario(nombre);
    }

    this.obtenerUsuarios = function () {
        return this.usuarios;
    }

    this.usuarioActivo = function (nombre) {
        if (this.usuarios[nombre]) {
            return "El usuario " + nombre + " existe.";
        }
        return "El usuario " + nombre + " NO existe.";
    }

    this.eliminarUsuario = function (nombre) {
        if (this.usuarios[nombre]) {
            delete this.usuarios[nombre];
            return "Se ha eliminado al usuario " + nombre;
        }
    }

    this.numeroUsuarios = function () {
        return Object.keys(this.usuarios).length;
    }
}

function Usuario(nombre) {
    this.nombre = nombre;
}

module.exports.Sistema = Sistema;