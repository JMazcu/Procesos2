function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        let cadena = '<div id="divAu" class="form-group">'
            + '<label for= "nombreAu"> Nombre:</label>'
            + '<input id="nombreAu" type="text" class="form-control" ></input>'
            + '<button id="btnAu" type="submit" class="btn btn-primary">Confirmar</button>'
            +'</div>';
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
            + '<label for= "nombreUa"> Comprobar si está activo:</label>'
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
            + '<label for= "btnNu"> Mostrar n.º de usuarios:</label>'
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

    this.mostrarTodo = function () {
        this.mostrarAgregarUsuario();
        this.mostrarObtenerUsuarios();
        this.mostrarUsuarioActivo();
        this.mostrarNumeroUsuarios();
        this.mostrarEliminarUsuario();
    }
}