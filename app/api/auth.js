var UserModel = require("../models/user")

var Auth = function(conf,redis){
	this.redis = redis;
	this.conf = conf || {};
	this.model = new UserModel();

	this.response = function(){
		this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
	}
}

Auth.prototype.post_signin = function(req,res,next){
	var query = {
		userName:req.body.userName,
		pwd:req.body.pwd
	}
	console.log("Query: ",query)
	this.model.get(query,function(err,doc){
		if(err){
			res.json({
				err:err
			})
			return;
		}
		console.log(doc)
		if(doc.length > 0){
			console.log(doc[0])
			res.json({
				status: true,
				user_data:{
					id:doc[0]._id,
					name:doc[0].name,
					email:doc[0].email,
					phone:doc[0].phone,
					direction:doc[0].direction,
				}
			})
		}else{
			res.json({
				"msg":"Usuario o contraseña incorrectos"
			})
		}

	})
}

module.exports = Auth;
