let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;
let Float = require('mongoose-float').loadType(mongoose, 2);

const colection = 'Order';
let dbSchema = new Schema({
	firm: {type: ObjectId, ref: 'Firm'},
	creater: {type: ObjectId, ref: 'User'},

	code: String,	// 本公司唯一
	cter: {type: ObjectId, ref: 'Cter'},
	ctAt: Date,		// 创建日期，即收货日期
	status: Number,
	edAt: Date, 	// 送货日期

	genre: String,
	price: Float,

	drap: String,	// 面料
	width: String,	// 门幅
	note: String,	// 备注

	tmplet: {type: ObjectId, ref: 'Tmplet'},
	colors: [{
		code: String,
		color: String,
		extent: Float,	// 长度
		ship: Float,	// 长度
	}],
	ship: Float,
	imp: Float,
});

dbSchema.pre('save', function(next) {	
	if(this.isNew) {
		this.status = 0;
	}
	next();
})

module.exports = mongoose.model(colection, dbSchema);