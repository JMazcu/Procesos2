function ClienteRest() {
    this.agregarUsuario = function (nombre) {
        var cli = this;
        $.getJSON("/agregarUsuario/" + nombre, function (data) {
            let msg = "El nombre " + nombre + " está en uso.";
            if (data.nombre != -1) {
                console.log("El usuario " + nombre + " ha sido registrado.");
                msg = "Bienvenido al sistema, " + nombre;
                $.cookie("nombre", nombre);
            }
            else {
                console.log("El nombre " + nombre + " ya está en uso.");
            }
            cw.mostrarMensaje(msg);
        });
    }

    /*this.agregarUsuarioAlter = function (nombre) {
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
    }*/

    this.registrarUsuario = function (email, password) {
        $.ajax({
            type: 'POST',
            url: '/registrarUsuario',
            data: JSON.stringify({ "email": email, "password": password }),
            success: function (data) {
                if (data.nombre != -1) {
                    console.log("El usuario " + data.nombre + " ha sido registrado");
                    $.cookie("nombre", data.nombre);
                    cw.limpiar();
                    cw.mostrarMensaje("Bienvenido, " + data.nombre);
                    //cw.mostrarLogin();
                }
                else {
                    console.log("El nick está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
        });
    }

    this.loginUsuario = function (email, password) {
        $.ajax({
            type: 'POST',
            url: '/loginUsuario',
            data: JSON.stringify({ "email": email, "password": password }),
            success: function (data) {
                if (data.nick != -1) {
                    console.log("Usuario " + data.nick + " ha sido registrado");
                    $.cookie("nick", data.nick);
                    cw.limpiar();
                    cw.mostrarMensaje("Bienvenido al sistema, " + data.nick);
                    //cw.mostrarLogin();
                }
                else {
                    console.log("No se pudo iniciar sesión");
                    cw.mostrarLogin();
                    cw.mostrarMensajeLogin("No se pudo iniciar sesión");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
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