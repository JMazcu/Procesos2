function ClienteWS() {
    this.socket = undefined;
    this.ini = function () {
        this.socket = io.connect();
    }
    this.ini();

    this.crearPartida = function () {
        this.socket.emit("crearPartida", { "email": this.email });
    }

    this.unirseAPartida = function () {
        this.socket.emit("unirseAPartida", { "email": this.email, "codigo":codigo });
    }

    this.socket.on("partidaCreada", function (datos) {
        console.log(datos.codigo);
        ws.codigo = datos.codigo;
        // cw mostrar esperando rival
    });

    this.socket.on("unidoApartida", function (codigo) {
        console.log(codigo);
        ws.codigo = datos.codigo;
        // cw mostrar esperando rival
    });

    this.socket.on("listaPartidas", function (lista) {
        console.log(lista);
        // cw mostrar esperando rival
    });

}