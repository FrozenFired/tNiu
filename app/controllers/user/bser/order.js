let Err = require('../aaIndex/err');
let Conf = require('../../../confile/conf');

let Order = require('../../../models/client/order');

let User = require('../../../models/mycompany/user');
let Cter = require('../../../models/client/cter');

let Firm = require('../../../models/mycompany/firm');

let _ = require('underscore')
let moment = require('moment')

exports.bsOrder = function(req, res) {
	let crUser = req.session.crUser;
	let id = req.params.id
	Order.findOne({_id: id})
	.populate('cter', 'nome')
	.populate('firm')
	.populate('tmplet')
	.exec(function(err, order) {
		if(err) {
			info = "bsOrders, Order.findOne, Error";
			Err.usError(req, res, info);
		} else {
			// console.log(order)
			res.render('./user/bser/order/detail', {
				title : '订单列表',
				crUser: crUser,
				order : order
			});
		}
	})
}

exports.bsOrderEnd = function(req, res) {
	let crUser = req.session.crUser;
	let id = req.params.id
	Order.findOne({_id: id})
	.exec(function(err, order) {
		if(err) {
			info = "bsOrders, Order.findOne, Error";
			Err.usError(req, res, info);
		} else {
			order.status = 1;
			let ship = 0;
			for(iCl in order.colors) {
				if(!isNaN(parseInt(order.colors[iCl].ship))) {
					ship += parseInt(order.colors[iCl].ship);
				}
			}
			order.ship = parseInt(ship);
			order.imp = ship * parseFloat(order.price);
			order.edAt = Date.now();
			order.save(function(err, objSv) {
				if(err) console.log(err);
				res.redirect('/bsOrder/'+id);
			})
		}
	})
}

exports.bsOrderDel = function(req, res) {
	let crUser = req.session.crUser;
	let id = req.params.id
	Order.deleteOne({_id: id})
	.exec(function(err, order) {
		if(err) {
			info = "bsOrderDel, findOne.find, Error";
			Err.usError(req, res, info);
		} else {
			res.redirect('/bsOrders')
		}
	})
}

exports.bsOrders = function(req, res) {
	let crUser = req.session.crUser;

	let symSts = '$eq';
	let condSts = 0;
	if(req.query.status) {
		if(req.query.status == 1) {
			condSts = 1
		} else if(req.query.status == 0) {
			condSts = 0;
		} else if(req.query.status == -1) {
			symSts = '$ne';
			condSts = -1;
		}
	}

	let randNum = 1546484;
	let symAtFm = "$gte";
	let condAtFm = new Date(new Date().setHours(0, 0, 0, 0))
	let symAtTo = "$lte";
	let condAtTo = new Date(new Date().setHours(23, 59, 59, 0)) 
	if(condSts == 0) {
		symAtFm = "$ne";
		condAtFm = randNum;
		symAtTo = "$ne";
		condAtTo = randNum;
	}
	if(req.query.atFm && req.query.atFm.length == 10){
		symAtFm = "$gte";   // $ ne eq gte gt lte lt
		condAtFm = new Date(req.query.atFm).setHours(0,0,0,0);
	}
	if(req.query.atTo && req.query.atTo.length == 10){
		symAtTo = "$lte";
		condAtTo = new Date(req.query.atTo).setHours(23,59,59,0);
	}

	Order.find({
		'firm': crUser.firm,
		'status': {[symSts]: condSts},
		'ctAt': {[symAtFm]: condAtFm, [symAtTo]: condAtTo},
	})
	.populate('cter', 'nome')
	.populate('tmplet')
	.sort({"status": 1, "ctAt": -1})
	.exec(function(err, orders) {
		if(err) {
			info = "bsOrders, User.find, Error";
			Err.usError(req, res, info);
		} else {
			res.render('./user/bser/order/list', {
				title : '订单列表',
				crUser: crUser,
				orders : orders,
				status : condSts,
			});
		}
	})
}

exports.bsOrderAdd = function(req, res) {
	let crUser = req.session.crUser;

	Cter.find({'firm': crUser.firm})
	.exec(function(err, cters) {
		if(err) console.log(err);
		Firm.findOne({_id: crUser.firm})
		.exec(function(err, firm) {
			if(err) {
				console.log(err);
				info = "bsOrderAdd, Firm.findOne, Error!";
				Err.usError(req, res, info);
			} if(!firm || !firm.genres || firm.genres.length<0) {
				console.log(firm)
				info = "请在公司页面设置，染洗类型";
				Err.usError(req, res, info);
			} else {
				res.render('./user/bser/order/add', {
					title : '添加订单',
					crUser: crUser,
					cters : cters,
					genres: firm.genres,
				});
			}
		})
	})
}

exports.bsOrderNew = function(req, res) {
	let crUser = req.session.crUser;
	let obj = req.body.obj;
	obj.price = parseFloat(obj.price);
	let colors = new Array();
	for(let iCl in obj.colors) {
		let color = obj.colors[iCl];
		let et = parseInt(color.extent)
		if(isNaN(et) || et < 1) continue;
		color.extent = et;
		colors.push(color);
	}
	obj.colors = colors;

	obj.firm = crUser.firm;
	obj.creater = crUser._id;
	obj.ctAt = Date.now();

	let st = new Date(new Date().setHours(0, 0, 0, 0));
	let ed = new Date(new Date().setHours(23, 59, 59, 999));
	let today =parseInt(moment(Date.now()).format('YYMMDD'))
	Order.find({
		'ctAt': {'$gte': st, '$lte': ed},
	})
	.exec(function(err, orders){
		if(err) console.log(err);
		let leng = orders.length+1;
		for(let iLen = (leng + "").length; iLen < 3; iLen = leng.length) { // 序列号补0
			leng = "0" + leng;
		}
		obj.code = obj.genre+today+leng;
		let _order = new Order(obj)
		_order.save(function(err, objSv) {
			if(err) console.log(err);
			res.redirect('/bsOrders')
		})
	})
}

exports.bsOrderClUpAjax = function(req, res) {
	let ship = parseInt(req.query.ship)
	let orderId = req.query.orderId
	let colorId = req.query.colorId

	Order.findOne({_id: orderId})
	.exec(function(err, order) {
		if(err) console.log(err);
		let flag = 0;
		for(iCl in order.colors) {
			if(order.colors[iCl]._id == colorId) {
				order.colors[iCl].ship = ship;
				flag = 1;
				break;
			}
		}
		if(flag == 0) {
			res.json({result: 0})
		} else {
			order.save(function(err, orderSave) {
				if(err) console.log(err);
				res.json({result: 1})
			})
		}
	})
}