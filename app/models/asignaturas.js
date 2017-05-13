var schemaAsignatura = require('./schemas/asignaturas'),
	mongoose = require('mongoose');

class Asignatura{
	constructor(conf) {
		conf = conf || {};
		this.model = schemaAsignatura;
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
			var category = new self.model({
				_id:id,
				nombre: data.nombre
			})
			category.save(function(err, doc) {
				callback(err, doc);
			});
	    });
	}
	getAll(callback) {
		this.model.find({}).select({ "nombre": 1, "_id": 1}).exec(function(err, doc) {
			console.log("EU")
			callback(err,doc)
		})
	}
}


module.exports = Asignatura;
