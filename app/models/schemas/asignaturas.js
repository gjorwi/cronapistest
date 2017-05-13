var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var asignaturasSchema = new Schema({
	_id: {
		type: Number,
		require: true,
		default: 0
	},
	nombre:{
		type: String,
		require: true,
		unique: true
	},
	valor_respuesta:{
		type:Number
	}
});


var Asignatura = mongoose.model('Asignatura',asignaturasSchema);

module.exports = Asignatura;
