function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        let cadena = '<div id="divAu">'
            + '<div class="card"><div class="card-body">'
            + '<div class="form-group">'
            + '<label for= "nombreAu"> Registrarse:</label>'
            + '<p><input id="nombreAu" type="text" class="form-control" placeholder="Introduzca un nombre"></input></p>'
            + '<button id="btnAu" type="submit" class="btn btn-primary">Registrarse</button>'
            + ' <div> <a href="/auth/google"><img src="./cliente/img/web_light_rd_SI@1x.png" style="height:40px;"></a></div>'
            + '</div>'
            + '</div></div></div>';
        $("#au").append(cadena);
        $("#btnAu").on("click", function () {
            let nombre = $("#nombreAu").val();
            rest.agregarUsuario(nombre);
            $("#divAu").remove();
        });
    }

    this.mostrarObtenerUsuarios = function () {
        let cadena = '<div id="divOu" class="form-group">'
            + '<label for= "btnOu"> Mostrar lista de usuarios</label>'
            + '<button id="btnOu" type="submit" class="btn btn-primary">Mostrar</button>'
            + '</div>';
        $("#ou").append(cadena);
        $("#btnOu").on("click", function () {
            rest.obtenerUsuarios();
            $("#divOu").remove();
        });
    }

    this.mostrarUsuarioActivo = function () {
        let cadena = '<div id="divUa" class="form-group">'
            + '<label for= "nombreUa"> Comprobar si est&aacute; activo:</label>'
            + '<input id="nombreUa" type="text" class="form-control" ></input>'
            + '<button id="btnUa" type="submit" class="btn btn-primary">Comprobar</button>'
            + '</div>';
        $("#ua").append(cadena);
        $("#btnUa").on("click", function () {
            let nombre = $("#nombreUa").val();
            rest.usuarioActivo(nombre);
            $("#divUa").remove();
        });
    }

    this.mostrarNumeroUsuarios = function () {
        let cadena = '<div id="divNu" class="form-group">'
            + '<label for= "btnNu"> Mostrar n.&deg; de usuarios:</label>'
            + '<button id="btnNu" type="submit" class="btn btn-primary">Mostrar</button>'
            + '</div>';
        $("#nu").append(cadena);
        $("#btnNu").on("click", function () {
            rest.numeroUsuarios();
            $("#divNu").remove();
        });
    }

    this.mostrarEliminarUsuario = function () {
        let cadena = '<div id="divEu" class="form-group">'
            + '<label for= "nombreEu"> Eliminar usuario:</label>'
            + '<input id="nombreEu" type="text" class="form-control" ></input>'
            + '<button id="btnEu" type="submit" class="btn btn-primary">Eliminar</button>'
            + '</div>';
        $("#eu").append(cadena);
        $("#btnEu").on("click", function () {
            let nombre = $("#nombreEu").val();
            rest.eliminarUsuario(nombre);
            $("#divEu").remove();
        });
    }

    this.mostrarRegistro = function () {
        $("#fmRegistro").remove();
        $("#registro").load("./cliente/registro.html", function () {
            $("#btnRegistro").on("click", function (e) {
                e.preventDefault();
                let email = $("#email").val();
                let pwd = $("#pwd").val();
                if (email && pwd) {
                    rest.registrarUsuario(email, pwd);
                    console.log(email + " " + pwd);
                }
            });
        });
    }

    this.mostrarLogin = function () {
        if ($.cookie('nombre')) {
            return true;
        };
        $("#fmLogin").remove();
        $("#registro").load("./cliente/login.html", function () {
            $("#btnLogin").on("click", function () {
                let email = $("#logEmail").val();
                let pwd = $("#logPwd").val();
                if (email && pwd) {
                    rest.loginUsuario(email, pwd);
                    console.log(email + " " + pwd);
                }
            });
        });
    }

    this.comprobarSesion = function () {
        let nombre = $.cookie("nombre");
        if (nombre) {
            cw.mostrarMensaje("Bienvenido al sistema, " + nombre);
        }
        else {
            cw.mostrarRegistro();
        }
    }

    this.salir = function () {
        $.removeCookie("nombre");
        rest.cerrarSesion();
        location.reload();
        cw.mostrarMensaje("Se ha cerrado la sesi&oacute;n.");
    }

    this.mostrarMensaje = function (msg) {
        $("#divMsg").remove();
        let cadena = '<div id="divMsg" class="form-group">'
            + '<h4>' + msg + '</h4>'
            + '</div>';
        $("#msg").append(cadena);
    }

    this.mostrarModal = function (m) {
        $("#msg").remove();
        let cadena = "<div id='msg'>" + m + "</div>";
        $("#mBody").append(cadena);
        $("#miModal").modal();
        //$('#btnModal').on('click',function(){
        //});
    }

    this.mostrarTodo = function () {
        this.mostrarAgregarUsuario();
        this.mostrarObtenerUsuarios();
        this.mostrarUsuarioActivo();
        this.mostrarNumeroUsuarios();
        this.mostrarEliminarUsuario();
    }

    this.limpiar = function () {
        $("#divAu").remove();
        $("#fmRegistro").remove();
        $("#fmLogin").remove();
        $("#divMsg").remove();
        location.reload();
    }
}