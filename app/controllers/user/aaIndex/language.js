exports.usLanguage = function(router, rPath, crUser) {
	let language = require('../../../confile/lang'+router+rPath);
	// console.log(language);
	let Lang = language.cn;
	if(crUser.lang && crUser.lang == 1) {
		Lang = language.en;
	} else if(crUser.lang && crUser.lang == 2) {
		Lang = language.it;
	}
	return Lang;
}
