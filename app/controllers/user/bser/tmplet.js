let Err = require('../aaIndex/err');
// let Language = require('../aaIndex/language');
let Conf = require('../../../confile/conf');

let Tmplet = require('../../../models/material/tmplet');

let _ = require('underscore')
let moment = require('moment')

exports.bsTmplets = function(req, res) {
	Tmplet.find()
	.exec(function(err, tmplets) {
		if(err) console.log(err);
		// console.log(tmplets);
		res.render('./user/bser/tmplet/list', {
			title: '样板',
			crUser: req.session.crUser,
			tmplets: tmplets
		})
	})
}

exports.bsTmpletAdd = function(req, res) {
	res.render('./user/bser/tmplet/add', {
		title: '添加新样板',
		crUser: req.session.crUser,
	})
}

exports.bsTmpletNew = function(req, res) {
	let crUser = req.session.crUser;
	let obj = req.body.obj;
	let _tmplet = new Tmplet(obj);
	// console.log(_tmplet)
	_tmplet.save(function(err, objSave) {
		if(err) console.log(err);
		res.redirect('/bsTmplets')
	})
}

exports.bsTmplet = function(req, res) {
	let id = req.params.id;
	Tmplet.findOne({_id: id})
	.exec(function(err, tmplet) {
		if(err) console.log(err);
		// console.log(tmplet);
		res.render('./user/bser/tmplet/detail', {
			title: '样板',
			crUser: req.session.crUser,
			tmplet: tmplet
		})
	})
}

exports.bsTmpletDel = function(req, res) {
	let id = req.params.id;
	Tmplet.deleteOne({_id: id}, function(err, objRm) {
		if(err) {
			console.log(err);
			info = "bsTmpletDel, Tmplet.deleteOne, Error!";
			Err.usError(req, res, info);
		} else {
			res.redirect('/bsTmplets')
		}
	})
}

exports.bsTmpletAddColorAjax = function(req, res) {
	let tmpletId = req.body.tmpletId;
	let color = req.body.color;
	Tmplet.findOne({_id: tmpletId})
	.exec(function(err, tmplet) {
		if(err) console.log(err);
		let icl = 0;
		for(;icl < tmplet.colors.length; icl++) {
			if(tmplet.colors[icl].code == color.code) break;
		}
		if(icl == tmplet.colors.length) {
			tmplet.colors.push(color)
			tmplet.save(function(err, objSave) {
				if(err) console.log(err);
				res.json({success: 1})
			})
		} else {
			res.json({success: 0})
		}
	})
}
exports.bsTmpletDelColorAjax = function(req, res) {
	let tmpletId = req.body.tmpletId;
	let colorId = req.body.colorId;
	Tmplet.findOne({_id: tmpletId})
	.exec(function(err, tmplet) {
		if(err) console.log(err);
		let icl = 0, color = null;
		for(;icl < tmplet.colors.length; icl++) {
			color = tmplet.colors[icl];
			if(color._id == colorId) {
				break;
			}
		}
		if(icl == tmplet.colors.length) {
			res.json({success: 0})
		} else {
			tmplet.colors.remove(color)
			tmplet.save(function(err, objSave) {
				if(err) console.log(err);
				res.json({success: 1})
			})
		}
	})
}

exports.bsTmpletAjaxTmplets = function(req, res) {
	let crUser = req.session.crUser;
	let str = req.query.str;
	keyword = new RegExp(str + '.*');
	Tmplet.find({
		$or:[
			{'code':    {'$in': keyword} },
			{'codeNum': {'$in': keyword} },
			{'nome':    {'$in': keyword} },
		],
	})
	.exec(function(err, tmplets) {
		if(err) console.log(err);
		if(tmplets && tmplets.length > 0) {
			res.json({success: 1, tmplets: tmplets})
		}
	})
}