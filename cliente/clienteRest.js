function ClienteRest() {
    this.agregarUsuario = function (nombre) {
        var cli = this;
        $.getJSON("/agregarUsuario/" + nombre, function (data) {
            if (data.nombre != -1) {
                console.log("El usuario " + nombre + " ha sido registrado.");
            }
            else {
                console.log("El nombre " + nombre + " ya está en uso.");
            }
        })
    }

    this.agregarUsuarioAlter = function (nombre) {
        $.ajax({
            type: 'GET',
            url: '/agregarUsuario/' + nombre,
            success: function (data) {
                if (data.nombre != -1) {
                    console.log("El usuario " + nombre + " ha sido registrado.");
                }
                else {
                    console.log("El nombre " + nombre + " ya está en uso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType:'application/json'
        });
    }

    this.obtenerUsuarios = function () {
        var cli = this;
        $.getJSON("/obtenerUsuarios", function (data) {
            console.log("Lista de usuarios:");
            console.log(data);
        })
    }

    this.usuarioActivo = function (nombre) {
        $.ajax({
            type: 'GET',
            url: '/usuarioActivo/' + nombre,
            success: function (data) {
                    console.log("Activo: " + data.activo);             
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
        });
    }

    this.eliminarUsuario = function (nombre) {
        var cli = this;
        $.getJSON("/eliminarUsuario/" + nombre, function (data) {
            if (data.nombre != -1) {
                console.log("El usuario " + nombre + " se ha eliminado.");
            }
            else {
                console.log("El usuario " + nombre + " no existía.");
            }
        })
    }

    this.numeroUsuarios = function () {
        $.ajax({
            type: 'GET',
            url: '/numeroUsuarios',
            success: function (data) {
                    console.log(data);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
        });
    }
}