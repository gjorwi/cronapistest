var schemaPersona = require('./schemas/personas'),
	mongoose = require('mongoose');

class Persona{
	constructor(conf) {
		conf = conf || {};
		this.model = schemaPersona;
	}
	save(data, callback) {
		var persona = new this.model({
			dni:data. dni,
			nombre:data.nombre,
			apellido:data.apellido,
			sexo:data.sexo,
			nacimiento:data.nacimiento
		})
		persona.save(function(err, doc) {
			callback(err, doc);
		});
	}
	getAll(callback) {
		this.model.find({}).exec(function(err, doc) {
			console.log("EU")
			callback(err,doc)
		})
	}
}


module.exports = Persona;
