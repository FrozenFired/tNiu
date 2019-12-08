let Err = require('../aaIndex/err');
let Language = require('../aaIndex/language');

let Firm = require('../../../models/mycompany/firm');
let _ = require('underscore');

exports.bsFirm = function(req, res) {
	let crUser = req.session.crUser;
	Firm.findOne({_id: crUser.firm}, function(err, firm) {
		if(err) {
			console.log(err);
			info = "bsFirm, Firm.findOne, Error!";
			Err.usError(req, res, info);
		} else if(!firm) {
			info = "公司信息出现错误，联系管理员";
			Err.usError(req, res, info);
		} else {
			let Lang = Language.usLanguage('/user', '/firm', crUser)
			res.render('./user/bser/firm/detail', {
				title: Lang.title,
				Lang : Lang,
				crUser: crUser,

				firm : firm,
			});
		}
	});
}


exports.bsFirmUpd = function(req, res) {
	let obj = req.body.obj;
	Firm.findOne({_id: obj._id}, function(err, object) {
		if(err) {
			info = "修改公司信息时，数据库错误 请联系管理员";
			Err.usError(req, res, info);
		} else if(!object) {
			info = "公司信息被删除, 请联系管理员";
			Err.usError(req, res, info);
		} else {
			let _object = _.extend(object, obj);
			_object.save(function(err, objSave) {
				if(err) {
					info = "修改公司信息时，数据库保存错误 请联系管理员";
					Err.usError(req, res, info);
				} else {
					res.redirect("/bsFirm");
				}
			});
		}
	});
}


exports.bsFirmAddGenreAjax = function(req, res) {
	let crUser = req.session.crUser;
	let genre = req.body.genre;
	genre.price = parseFloat(genre.price);
	if(isNaN(genre.price)) {
		res.json({success: 0})
	} else {
		Firm.findOne({_id: crUser.firm})
		.exec(function(err, firm) {
			if(err) console.log(err);
			let iGn = 0;
			if(!firm.genres) firm.genres = new Array();
			for(;iGn < firm.genres.length; iGn++) {
				if(firm.genres[iGn].genre == genre.genre) break;
			}
			if(iGn == firm.genres.length) {
				firm.genres.push(genre)
				firm.save(function(err, objSave) {
					if(err) console.log(err);
					res.json({success: 1})
				})
			} else {
				res.json({success: 0})
			}
		})
	}
}
exports.bsFirmDelGenreAjax = function(req, res) {
	let firmId = req.body.firmId;
	let genreId = req.body.genreId;
	Firm.findOne({_id: firmId})
	.exec(function(err, firm) {
		if(err) console.log(err);
		let iGn = 0, genre = null;
		for(;iGn < firm.genres.length; iGn++) {
			genre = firm.genres[iGn];
			if(genre._id == genreId) {
				break;
			}
		}
		if(iGn == firm.genres.length) {
			res.json({success: 0})
		} else {
			firm.genres.remove(genre)
			firm.save(function(err, objSave) {
				if(err) console.log(err);
				res.json({success: 1})
			})
		}
	})
}