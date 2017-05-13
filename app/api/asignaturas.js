var AsignaturaModel = require("../models/asignaturas")

class Asignatura {
	constructor(conf,redis){
		this.redis = redis;
		this.conf = conf || {};
		this.model = new AsignaturaModel();

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
	get_all(req,res,next){
		this.model.getAll(function(err,docs){
			console.log("EUUU")
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

module.exports = Asignatura
