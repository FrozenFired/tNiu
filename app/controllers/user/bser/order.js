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
				title : '订单详情',
				crUser: crUser,
				order : order
			});
		}
	})
}

exports.bsOrderEnd = function(req, res) {
	let crUser = req.session.crUser;
	let obj = req.body.obj
	let id = obj.id;
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
			if(obj.edAt) {
				order.edAt = new Date(obj.edAt+" 22:00:00");
			} else {
				order.edAt = Date.now();
			}
			order.save(function(err, objSv) {
				if(err) console.log(err);
				res.redirect('/bsOrder/'+id);
			})
		}
	})
}

exports.bsOrderUp = function(req, res) {
	let crUser = req.session.crUser;
	let id = req.params.id;
	Order.findOne({_id: id})
	.populate('cter', 'nome')
	.populate('firm')
	.populate('tmplet')
	.exec(function(err, order) {
		if(err) {
			info = "bsOrders, Order.findOne, Error";
			Err.usError(req, res, info);
		} else {
			// for(let i=0; i<order.colors.length; i++) {
			// 	console.log("------------")
			// 	console.log(order.colors[i])
			// 	console.log("------------")
			// }
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
						res.render('./user/bser/order/update', {
							title : '订单更新',
							crUser: crUser,
							order : order,

							cters : cters,
							genres: firm.genres,
						});
					}
				})
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
			res.render('./user/bser/order/list', {
				title : '订单列表',
				genres: firm.genres,
				crUser: crUser
			});
		}
	})
	// res.render('./user/bser/order/list', {
	// 	title : '订单列表',
	// 	crUser: crUser,
	// 	orders : orders,
	// 	status : condSts,
	// 	condGenre: condGenre,
	// 	keyword: keyword
	// });
}
const bsOrdersParam = (req, res) => {
	let crUser = req.session.crUser;

	let keytype = "tcode", keyword = "";
	if(req.query.keyword) keyword = req.query.keyword;

	let symCter = '$ne';
	let condCter = null;
	if(req.query.cter) {
		symCter = '$eq';
		condCter = req.query.cter;
	}

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

	let symGenre = "$ne";
	let condGenre = null;
	if(req.query.genre && req.query.genre != 0) {
		symGenre = "$eq";
		condGenre = req.query.genre;
	}

	let randNum = 1546484;
	symAtFm = "$ne";
	condAtFm = randNum;
	symAtTo = "$ne";
	condAtTo = randNum;
	if(req.query.atFm && req.query.atFm.length == 10){
		symAtFm = "$gte";   // $ ne eq gte gt lte lt
		condAtFm = new Date(req.query.atFm).setHours(0,0,0,0);
	}
	if(req.query.atTo && req.query.atTo.length == 10){
		symAtTo = "$lte";
		condAtTo = new Date(req.query.atTo).setHours(23,59,59,999);
	}

	let symEdFm = "$ne";
	let condEdFm = randNum
	let symEdTo = "$ne";
	let condEdTo = randNum;
	if(req.query.edFm && req.query.edFm.length == 10){
		symEdFm = "$gte";   // $ ne eq gte gt lte lt
		condEdFm = new Date(req.query.edFm).setHours(0,0,0,0);
	}
	if(req.query.edTo && req.query.edTo.length == 10){
		symEdTo = "$lte";
		condEdTo = new Date(req.query.edTo).setHours(23,59,59,999);
	}

	let param;
	// param = {
	// 	'firm': crUser.firm,
	// 	'status': {[symSts]: condSts},
	// 	'genre': {[symGenre]: condGenre},
	// 	'cter': {[symCter]: condCter},
	// 	'ctAt': {[symAtFm]: condAtFm, [symAtTo]: condAtTo},
	// 	'edAt': {[symEdFm]: condEdFm, [symEdTo]: condEdTo},
	// 	'colors.code': new RegExp(keyword + '.*'),
	// };
	// console.log(condSts)
	if(condSts == 0) {
		param = {
			'firm': crUser.firm,
			'status': {[symSts]: condSts},
			'genre': {[symGenre]: condGenre},
			'cter': {[symCter]: condCter},
			'ctAt': {[symAtFm]: condAtFm, [symAtTo]: condAtTo},
			'colors.code': new RegExp(keyword + '.*'),
		};
	} else if(condSts == 1) {
		param = {
			'firm': crUser.firm,
			'status': {[symSts]: condSts},
			'genre': {[symGenre]: condGenre},
			'cter': {[symCter]: condCter},
			'ctAt': {[symAtFm]: condAtFm, [symAtTo]: condAtTo},
			'edAt': {[symEdFm]: condEdFm, [symEdTo]: condEdTo},
			'colors.code': new RegExp(keyword + '.*'),
		};
	} else if(condSts == -1) {
		param = {
			'firm': crUser.firm,
			'genre': {[symGenre]: condGenre},
			'cter': {[symCter]: condCter},
			'colors.code': new RegExp(keyword + '.*'),
			$or:[
				{'status': 0, 'ctAt': {[symAtFm]: condAtFm, [symAtTo]: condAtTo}},
				{'status': 1, 'ctAt': {[symAtFm]: condAtFm, [symAtTo]: condAtTo}, 'edAt': {[symEdFm]: condEdFm, [symEdTo]: condEdTo}},
			]
		};
	} else {
		param = {'firm': null, 'status': 100};
	}

	return param;
}
exports.apiBsOrders = async(req, res) => {
	// let page = 1;
	// if(req.query.page && !isNaN(parseInt(req.query.page))) {
	// 	page = parseInt(req.query.page);
	// }
	// let pagesize = 30;
	// if(req.query.pagesize && !isNaN(parseInt(req.query.pagesize))) {
	// 	pagesize = parseInt(req.query.pagesize);
	// }
	// let skip = (page-1)*pagesize;

	const param = bsOrdersParam(req, res);
	// console.log(param)
	try {
		// let count = await Order.countDocuments(param);

		let orders = await Order.find(param)
		// .skip(skip).limit(pagesize)
		.populate('cter', 'nome')
		.populate('tmplet')
		.sort({"ctAt": -1})
		
		// let isMore = 1;
		// if(page*pagesize >= count) isMore = 0;

		return res.status(200).json({
			status: 200,
			message: '成功获取',
			data: {orders}
			// data: {orders, count, page, isMore}
		});
	} catch(error) {
		console.log(error)
		return res.json({status: 500, message: '系统错误, 请联系管理员。 错误码: get/api/bsOrders[1]'})
	}
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

	let st = new Date(new Date().setHours(0, 0, 0, 0));
	let ed = new Date(new Date().setHours(23, 59, 59, 999));
	if(obj.ctAt) {
		st = new Date(obj.ctAt+" 00:00:00")
		ed = new Date(obj.ctAt+" 23:59:59:999")
	}
	let today =parseInt(moment(st).format('YYMMDD'))
	Order.find({
		'ctAt': {'$gte': st, '$lte': ed},
	})
	.sort({'ctAt': -1})
	.exec(function(err, orders){
		if(err) console.log(err);
		let leng = orders.length+1;
		for(let iLen = (leng + "").length; iLen < 3; iLen = leng.length) { // 序列号补0
			leng = "0" + leng;
		}
		obj.code = obj.genre+today+leng;
		if(orders && orders.length == 0) {
			obj.ctAt = st;
		} else {
			if(obj.ctAt) {
				obj.ctAt = orders[0].ctAt.getTime() + 1;
			} else {
				obj.ctAt = Date.now();
			}
		}
		let _order = new Order(obj)
		_order.save(function(err, objSv) {
			if(err) console.log(err);
			res.redirect('/bsOrders')
		})
	})
}

exports.bsOrderUpd = function(req, res) {
	let crUser = req.session.crUser;
	let obj = req.body.obj;
	let orgId = req.body.orgId;
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

	Order.findOne({_id: orgId}, function(err, order) {
		if(err) console.log(err);
		if(moment(order.ctAt).format("DD/MM/YYYY") == obj.ctAt) {
			obj.code = order.code;
			obj.ctAt = order.ctAt;
			let _order = new Order(obj)
			_order.save(function(err, objSv) {
				if(err) console.log(err);
				Order.deleteOne({_id: orgId}, function(err, rdrm) {
					if(err) console.log(err);
				})
				res.redirect('/bsOrders')
			})
		} else {
			let st = new Date(new Date().setHours(0, 0, 0, 0));
			let ed = new Date(new Date().setHours(23, 59, 59, 999));
			if(obj.ctAt) {
				st = new Date(obj.ctAt+" 00:00:00")
				ed = new Date(obj.ctAt+" 23:59:59:999")
			}
			let today =parseInt(moment(st).format('YYMMDD'))
			Order.find({
				'ctAt': {'$gte': st, '$lte': ed},
			})
			.sort({'ctAt': -1})
			.exec(function(err, orders){
				if(err) console.log(err);
				let leng = orders.length+1;
				for(let iLen = (leng + "").length; iLen < 3; iLen = leng.length) { // 序列号补0
					leng = "0" + leng;
				}
				obj.code = obj.genre+today+leng;
				if(orders && orders.length == 0) {
					obj.ctAt = st;
				} else {
					obj.ctAt = orders[0].ctAt.getTime() + 1;
				}

				let _order = new Order(obj)
				_order.save(function(err, objSv) {
					if(err) console.log(err);
					Order.deleteOne({_id: orgId}, function(err, rdrm) {
						if(err) console.log(err);
					})
					res.redirect('/bsOrders')
				})
			})
		}
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