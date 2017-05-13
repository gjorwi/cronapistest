var modelUser = require('./schema/user'),
	mongoose = require('mongoose');

var User = function(conf) {
	conf = conf || {};
	this.model = modelUser;
}

User.prototype.save = function(data, callback) {
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
		var user = new self.model({
			_id:id,
			userName: data.userName,
			pwd: data.pwd,
			name: data.name,
			dni: data.dni
		})
		user.save(function(err, doc) {
			console.log("Guardando")
			callback(err, doc);
		});
    })
}
User.prototype.get = function(query, callback) {
	console.log(query)
	this.model.find(query).exec(function(err, doc) {
		callback(err,doc)
	})
}

module.exports = User;
