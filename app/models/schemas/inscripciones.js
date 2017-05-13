var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Asignatura = require('./asignaturas'),
	Persona = require('./personas.js')
var inscripcionesSchema = new Schema({
	_id: {
		type: Number,
		require: true,
		default: 0
	},
	id_asignatura:{
		type:Number,
		ref:'Asignatura',
		require:true
	},
	estudiante:{
		type:Number,
		ref:'Persona',
		require:true
	},
	fecha:{
		type: Date,
       	default: Date.Now
	}
});


var Inscripcion = mongoose.model('Inscripcion',inscripcionesSchema);

module.exports = Inscripcion;
