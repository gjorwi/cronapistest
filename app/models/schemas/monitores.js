var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Asignatura = require('./asignaturas'),
	Inscripcion = require('./inscripciones')
var monitorSchema = new Schema({
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
	inscripcion:{
		type:Number,
		ref:'Inscripcion',
		require:true
	}
});


var Monitor = mongoose.model('Monitor',monitorSchema);

module.exports = Monitor;
