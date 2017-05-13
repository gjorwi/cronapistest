var PreguntaModel = require("../models/preguntas")

class Pregunta {
	constructor(conf,redis){
		this.redis = redis;
		this.conf = conf || {};
		this.model = new PreguntaModel();

		this.response = function(){
			this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
		}
	}

	//add
	post_save(req,res,next) {
		this.model.save(req.body,function(err,doc){
			if(err){
				console.log(err)
				res.json({
					err:err
				})
			}else{
				res.json({
					status:(doc == null)? false :true
				})
			}
		})
	};
	get_asignatura_data(req,res,next){

		this.model.getAsignatura(req.params,function(err,docs){
			if(err){
				res.json({
					err:err
				})
			}else{
				res.json(docs)
			}
		})
	}
}

module.exports = Pregunta
