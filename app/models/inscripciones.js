var schemaInscripcion = require('./schemas/inscripciones'),
	mongoose = require('mongoose');

class Inscripcion{
	constructor(conf) {
		conf = conf || {};
		this.model = schemaInscripcion;
	}
	save(data, callback) {
		console.log(data)
		var self = this
		this.model.find({}).sort({_id: -1}).limit(1).exec(function(err,docs){
	    	if(err){
	    		console.log(err)
	    		return
	    	}
	    	var id = 0;
	    	if(docs.length > 0){
	    		id = parseInt(docs[0]._id) + 1;
	    	}else{
	    		id = 1;
	    	}
			var inscripcion = new self.model({
				_id:id,
				id_asignatura:data.id_asignatura,
				estudiante:data.dni
			})
			inscripcion.save(function(err, doc) {
				callback(err, doc);
			});
	    });
	}
	getAsignatura(data,callback) {
		console.log(data)
		this.model.find({id_asignatura:data.data}).sort({fecha:-1}).exec(function(err, doc) {
			callback(err,doc)
		})
	}
	getAll(data,callback){
		this.model.find({estudiante:data.dni}).populate({
			path:'id_asignatura',
			select:'nombre'
		}).exec(function(err,docs){
			callback(err,docs)
		})
	}
}


module.exports = Inscripcion;
