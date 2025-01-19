describe('El sistema', function () {
    let sistema;

    beforeEach(function () {
        sistema = new Sistema()
    });

    it('inicialmente no tiene usuarios', function () {
        expect(sistema.numeroUsuarios()["N.º"]).toEqual(0);
    });

    it('permite agregar usuarios', function () {
        sistema.agregarUsuario("u1");
        expect(sistema.numeroUsuarios()["N.º"]).toEqual(1);
    });

    it('entrega la lista de usuarios', function () {
        sistema.agregarUsuario("u1");
        var usuarios = sistema.obtenerUsuarios();
        expect(usuarios["u1"].nombre).toEqual("u1");
    });

    it('permite conocer el estado de los usuarios', function () {
        sistema.agregarUsuario("u1");
        var res = sistema.usuarioActivo("u1");
        expect(res).toEqual("El usuario u1 existe.");
    });

    it('permite eliminar usuarios', function () {
        sistema.agregarUsuario("u1");
        sistema.eliminarUsuario("u1");
        expect(sistema.numeroUsuarios()["N.º"]).toEqual(0);
    });
})

