let Err = require('../aaIndex/err');
let Language = require('../aaIndex/language');

exports.bser = function(req, res) {
	let crUser = req.session.crUser;
	let Lang = Language.usLanguage('/user', '/index', crUser);
	// console.log(Lang);
	res.render('./user/bser/index/index', {
		title: Lang.title,
		Lang: Lang,
		thisUrl: "/bser",
		crUser : crUser,
	})
}