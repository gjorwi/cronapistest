var schemaPregunta = require('./schemas/preguntas'),
	mongoose = require('mongoose');

class Pregunta{
	constructor(conf) {
		conf = conf || {};
		this.model = schemaPregunta;
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
			var pregunta = new self.model({
				_id:id,
				id_inscripcion:data.id_inscripcion,
				pregunta:data.pregunta,
			})
			pregunta.save(function(err, doc) {
				callback(err, doc);
			});
	    });
	}
	getAsignatura(data,callback) {
		let param = data.data
		console.log(param)
		this.model.find({}).populate({
			path:'id_inscripcion',
			select:'id_asignatura',
			populate:{
				path:'id_asignatura',
				select:'nombre'
			}
		}).exec(function(err, doc) {
			let l=doc.length
			var results= []
			console.log(l)
			for(var i=0;i<l;i++){
				//console.log(doc[i].id_inscripcion._id+"=="+param)
				if('id_inscripcion' in doc[i].toObject() && doc[i].id_inscripcion._id==param){
					results.push(doc[i])
				}
				if(i==(l-1)){
					console.log(results)
					callback(err,results)
				}
			}
		})
	}
}


module.exports = Pregunta;
