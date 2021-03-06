// Criando controller de Escritorio

const mongoose = require('mongoose');
const Escritorio = mongoose.model('Escritorio');

exports.get = (req, res, next) => {
	Escritorio
		.find({}, 'nome email area')
		.then(data => {
			if (Array.isArray(data) && data.length) {
				res.status(200).send(data)
			} else {
				res.status(200).send({
					message: "Sem escritórios cadastrados!"
				})
			};
		});
};

exports.getByArea = (req, res, next) => {
	Escritorio
		.find({
			area: req.params.area
		}, 'nome email area')
		.then(data => {
			if (Array.isArray(data) && data.length) {
				res.status(200).send(data)
			} else {
				res.status(200).send({
					message: "Sem escritório por essa area!"
				});
			};
		});
};

exports.getByEmail = (req, res, next) => {
	Escritorio
		.findOne({
			email: req.params.email
		}, 'email senha')
		.then(data => {
			if (data = null) {
				res.status(200).send(data);
			} else {
				res.status(200).send({
					message: 'Escritório nao cadastrado'
				});
			};
		});
};

exports.postCadastro = (req, res, next) => {
	var escritorio = new Escritorio(req.body);
	escritorio
		.save()
		.then(x => {
			res.status(201).send({
				message: 'Escritorio cadastrado'
			});
		}).catch(erro => {
			res.status(400).send({
				err: 'Escritorio nao cadastrado',
				message: erro
			});
		});
};

exports.putSenha = (req, res, next) => {
	Escritorio
		.findOneAndUpdate(req.params.email, {
			$set: {
				senha: req.body.senha
			}
		}).then(data => {
			res.status(200).send({
				message: 'Cadastro atualizado'
			});
		}).catch(erro => {
			res.status(400).send({
				err: 'Cadastro nao atualizado',
				message: erro
			});
		});
};

exports.deleteConta = (req, res, next) => {
	Escritorio
		.findOneAndRemove({
			email: req.body.email
		})
		.then(data => {
			if (data == null) {
				res.status(400).send({
					message: 'Cadastro nao encontrado'
				})
			} else {
				res.status(200).send({
					message: 'Cadastro removido',
				})
			};
		});
};

mongoose.set('useFindAndModify', false);