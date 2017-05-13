var schemaMonitor = require('./schemas/monitores'),
	mongoose = require('mongoose');

class Monitor{
	constructor(conf) {
		conf = conf || {};
		this.model = schemaMonitor;
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

			var monitor = new self.model({
				_id:id,
				id_asignatura:data.id_asignatura,
				inscripcion:data.inscripcion
			})
			monitor.save(function(err, doc) {
				callback(err, doc);
			});
	    });
	}
	getAsignatura(data,callback) {
		console.log(data)
		this.model.find({id_asignatura:data.data}).exec(function(err, doc) {
			let l=doc.length
			var inscripcion = require('./schemas/inscripciones')
			var persona = require('./schemas/personas')
			if(l>0){
				console.log("---")
				var result=[]
				for(var i=0;i<l;i++){
					console.log("--"+doc[i].inscripcion)
					let id=doc[i].inscripcion
					var data = doc[i].toObject()
					var ll=l
					var cont=i
					inscripcion.find({_id:parseInt(id)}).exec(function(err2,doc2){
						console.log("ejecuto")
						console.log(doc2[0])
						if(err2){
							console.log(err2)
						}
						if(doc2.length>0){
							console.log("|||||")
							//data.inscripcion=Object.assign({}, "enmanandnas")
							var p=doc2[0].toObject()
							persona.find({dni:doc2[0].estudiante}).exec(function(fail,people){
								console.log("EUU")
								console.log(p)
								p.estudiante=people[0]
								console.log(p)
								data.inscripcion=p
								result.push(data)
								if(cont==(l-1)){
									console.log(i==(l-1))
									console.log(doc)
									callback(err,result)
								}
							})
							//console.log(data)
							//console.log(result)
						}
					})
				}
			}
		})
	}
}


module.exports = Monitor;
