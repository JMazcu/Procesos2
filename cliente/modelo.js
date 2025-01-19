function Sistema() {

    this.usuarios = {};

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
        let res = { "activo": false };
        if (this.usuarios[nombre]) {
            res =  { "activo": true };
        }
        return res;
    }

    this.eliminarUsuario = function (nombre) {
        let res = { nombre: -1 }
        if (this.usuarios[nombre]) {
            delete this.usuarios[nombre];
            res = { nombre: eliminado };
        }
        return res;
    }

    this.numeroUsuarios = function () {
        return { "num": Object.keys(this.usuarios).length };
    }
}

function Usuario(nombre) {
    this.nombre = nombre;
}