describe('El sistema', function () {
    let sistema;
    let usr1;
    let usr2;
    let usr3;

    beforeEach(function () {
        sistema = new Sistema();
        usr1 = { "nombre": "Antonio", "email": "anton@anton.com" };
        usr2 = { "nombre": "Beatriz", "email": "bea@bea.com" };
        usr3 = { "nombre": "Carlos", "email": "car@car.com" };
    });

    it('inicialmente no tiene usuarios', function () {
        expect(sistema.numeroUsuarios()["num"]).toEqual(0);
    });

    it('permite agregar usuarios', function () {
        // Comprueba la respuesta de agregarUsuario
        expect(sistema.agregarUsuario(usr1)).toEqual({ "nombre": usr1.nombre });
        // Comprueba si el n�mero de usuarios ha aumentado
        expect(sistema.numeroUsuarios()["num"]).toEqual(1);
        //Comprueba si los valores guardados son correctos
        expect(sistema.usuarios["Antonio"].nombre).toEqual(usr1.nombre);
        expect(sistema.usuarios["Antonio"].email).toEqual(usr1.email);
    });

    it('entrega la lista de usuarios', function () {
        sistema.agregarUsuario(usr1);
        var usuarios = sistema.obtenerUsuarios();
        expect(usuarios).toContain("Nombre: " + usr1.nombre);
        expect(usuarios).toContain("Correo: " + usr1.email);
    });

    it('permite conocer el estado de los usuarios', function () {
        // Comprueba si un usuario est� inactivo antes de insertarlo
        var res = sistema.usuarioActivo(usr1);
        expect(res).toEqual({ "activo": false });
        // Inserta el usuario
        sistema.agregarUsuario(usr1);
        // Comprueba si el usuario est� activo tras insertarlo
        res = sistema.usuarioActivo(usr1);
        expect(res).toEqual({ "activo": true });
    });

    it('permite eliminar usuarios', function () {
        sistema.agregarUsuario(usr1);
        // Comprueba si la respuesta es que se ha eliminado
        expect(sistema.eliminarUsuario(usr1)).toEqual({ "eliminado": true });
        // Comprueba si no hay usuarios
        expect(sistema.numeroUsuarios()["num"]).toEqual(0);
        // Comprueba si la respuesta es que no se ha eliminado, ya que no existe
        expect(sistema.eliminarUsuario(usr1)).toEqual({ "eliminado": false });
    });

    it('permite crear partidas', function () {
        sistema.agregarUsuario(usr1);
        let codigo = sistema.crearPartida(usr1.nombre);
        // Comprueba si ha aumentado el n�mero de partidas
        expect(Object.keys(sistema.partidas).length).toEqual(1);
        // Comprueba si el n�mero de jugadores de la partida es 1 (se ha a�adido el jugador que la ha creado)
        expect(sistema.partidas[codigo].jugadores.length).toEqual(1);
    });

    it('permite unirse a una partida', function () {
        sistema.agregarUsuario(usr1);
        sistema.agregarUsuario(usr2);
        sistema.agregarUsuario(usr3);
        let codigo = sistema.crearPartida(usr1.nombre);
        // Comprueba si un jugador que ya est� en la partida no puede unirse
        expect(sistema.unirseAPartida(usr1.nombre, codigo)).toBe(false);
        // Comprueba si permite a un jugador unirse a la partida
        expect(sistema.unirseAPartida(usr2.nombre, codigo)).toBe(true);
        // Comprueba si el n�mero de jugadores es el m�ximo
        expect(sistema.partidas[codigo].jugadores.length).toEqual(sistema.partidas[codigo].maxJug);
        // Comprueba si un jugador no puede unirse a una partida llena
        expect(sistema.unirseAPartida(usr3.nombre, codigo)).toBe(false);
        // Comprueba si un jugador no puede unirse a una partida inexistente
        expect(sistema.unirseAPartida(usr3.nombre, "")).toBe(false);
    });

    it('entrega la lista de partidas disponibles', function () {
        sistema.agregarUsuario(usr1);
        let codigo = sistema.crearPartida(usr1.nombre);
        let lista = sistema.obtenerPartidasDisponibles();
        expect(lista[0].owner).toEqual(sistema.usuarios[usr1.nombre]);
        expect(lista[0].codigo).toEqual(codigo);
    });
})

