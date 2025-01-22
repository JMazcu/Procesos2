const nodemailer = require('nodemailer');
const url = "http://localhost:3000/";
//const gv = require('./gestorVariables.js');
//const url = "https://procesos2-958785136788.europe-west1.run.app";

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'mazcusender@gmail.com',
		pass: 'gdhm gqmm bbiu wfyw'
	}
});

/*let transporter;
gv.obtenerOptions(function (res) {
	options = res;
	transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: options
	});
});*/

//send();

module.exports.enviarEmail = async function (direccion, key, men) {
	const result = await transporter.sendMail({
		from: 'mazcusender@gmail.com',
		to: direccion,
		subject: men,
		text: 'Pulsa aquí para confirmar cuenta',
		html: '<p>Bienvenido a Sistema</p><p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'"> Pulsa aquí para confirmar cuenta</a></p>'
	});
}