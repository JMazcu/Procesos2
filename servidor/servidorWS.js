function ServidorWS(io) {
    this.lanzarServer = function (io, sistema) {
        let srv = this;
        io.on('connection', function (socket) {
            console.log("Capa WS activa");
            socket.on("crearPartida", function (datos) {
                let codigo = sistema.crearPartida(datos.email);
                if (codigo != -1) {
                    socket.join(codigo);
                }
                srv.enviarAlRemitente(socket, "partidaCreada", { "codigo": codigo });
                let lista = sistema.obtenerPartidasDisponibles();
                srv.enviarATodosMenosRemitente(socket, "listaPartidas", lista);
            });
            socket.on("unirseAPartida", function (datos) {
                let res = sistema.unirseAPartida(datos.email, datos.codigo);
                if (res) {
                    socket.join(datos.codigo);
                    srv.enviarAlRemitente(socket, "unidoApartida", { "codigo": datos.codigo });
                }
                else {
                    srv.enviarAlRemitente(socket, "noUnidoAPartida", {});
                }
                let lista = sistema.obtenerPartidasDisponibles();
                srv.enviarGlobal(io, "listaPartidas", lista);
            });
        });
    }

    this.enviarAlRemitente = function (socket, mensaje, datos) {
        socket.emit(mensaje, datos);
    }
    this.enviarATodosMenosRemitente = function (socket, mens, datos) {
        socket.broadcast.emit(mens, datos);
    }
    this.enviarGlobal = function (io, mens, datos) {
        io.emit(mens, datos);
    }
}

module.exports.ServidorWS = ServidorWS;