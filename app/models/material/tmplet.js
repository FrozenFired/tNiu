let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;
let Float = require('mongoose-float').loadType(mongoose, 2);

const colection = 'Tmplet';
let dbSchema = new Schema({
	firm: {type: ObjectId, ref: 'Firm'},
	creater: {type: ObjectId, ref: 'User'},

	code: String,	// 本公司唯一
	codeNum: String,	// 本公司唯一

	nome: String,
	photo: { type: String, default: '/upload/tmplet/1.jpg' },

	colors: [{
		code: String,
		color: String,
	}],

	note: String,
});


module.exports = mongoose.model(colection, dbSchema);