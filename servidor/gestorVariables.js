/*const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');const client = new SecretManagerServiceClient();async function accesoCLAVECORREO() {    const name = 'projects/958785136788/secrets/CLAVECORREO';
    const [version] = await client.accessSecretVersion({ name: name, });
    const datos = version.payload.data.toString("utf8");
    return datos;
}

async function accesoCORREOENVIO() {
    const name = 'projects/958785136788/secrets/CORREOENVIO';
    const [version] = await client.accessSecretVersion({ name: name, });
    const datos = version.payload.data.toString("utf8");
    return datos;
}

module.exports.obtenerOptions = async function (callback) {
    let options = { user: "", pass: "" };
    let user = await accesoCORREOENVIO();
    let pass = await accesoCLAVECORREO();
    options.user = user;
    options.pass = pass;
    callback(options);
}*/