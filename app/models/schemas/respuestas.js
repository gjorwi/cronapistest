var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Pregunta = require('./preguntas'),
	Monitor = require('./monitores')
var respuestaSchema = new Schema({
	_id: {
		type: Number,
		require: true,
		default: 0
	},
	id_pregunta:{
		type:Number,
		ref:'Pregunta',
		require:true
	},
	id_monitor:{
		type:Number,
		ref:'Monitor',
		require:true
	},
	respuesta:{
		type:String,
		require:true
	},
	voto:{
		Type:Number,
		require:true,
		min:1,
		max:5
	}
});


var Respuesta = mongoose.model('Respuesta',respuestaSchema);

module.exports = Respuesta;
