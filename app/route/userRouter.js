let Index = require('../controllers/user/bser/index');

let User = require('../controllers/user/bser/user');
let Firm = require('../controllers/user/bser/firm');

let Tmplet = require('../controllers/user/bser/tmplet')

let Cter = require('../controllers/user/bser/cter')
let Order = require('../controllers/user/bser/order')
// let Road = require('../controllers/user/bser/road')

let MdBcrypt = require('../confile/middle/middleBcrypt');
let MdRole = require('../confile/middle/middleRole');
let MdPicture = require('../confile/middle/middlePicture')
let MdExcel = require('../confile/middle/middleExcel')

let multipart = require('connect-multiparty');
let postForm = multipart();

module.exports = function(app){
	/* ======================================== Index ======================================== */
	app.get('/bser', MdRole.bserIsLogin, Index.bser);
	/* ======================================== Index ======================================== */


	/* ======================================== User ======================================== */
	app.get('/bsMyInfo', MdRole.bserIsLogin, User.bsUserFilter, User.bsMyInfo)
	app.post('/bsUserUpdInfo', MdRole.bserIsLogin, postForm, MdPicture.addNewPhoto, User.bsUserUpd)
	app.post('/bsUserUpdPwd', MdRole.bserIsLogin, postForm, MdBcrypt.rqBcrypt, User.bsUserUpd)
	/* ======================================== User ======================================== */



	/* ======================================== Firm ======================================== */
	/* ---------------------------------------- Basic ---------------------------------------- */
	app.get('/bsFirm', MdRole.bserIsLogin, Firm.bsFirm);
	app.post('/bsFirmUpd', MdRole.bserIsLogin, postForm, Firm.bsFirmUpd);
	/* ---------------------------------------- Color ---------------------------------------- */
	app.post('/bsFirmAddGenreAjax', MdRole.bserIsLogin, postForm, Firm.bsFirmAddGenreAjax)
	app.post('/bsFirmDelGenreAjax', MdRole.bserIsLogin, postForm, Firm.bsFirmDelGenreAjax)
	/* ======================================== Firm ======================================== */



	/* ======================================== template ======================================== */
	app.get('/bsTmplets', MdRole.bserIsLogin, Tmplet.bsTmplets)
	app.get('/bsTmpletAdd', MdRole.bserIsLogin, Tmplet.bsTmpletAdd)
	app.post('/bsTmpletNew', MdRole.bserIsLogin, postForm, MdPicture.addNewPhoto, Tmplet.bsTmpletNew)

	app.get('/bsTmplet/:id', MdRole.bserIsLogin, Tmplet.bsTmplet)
	app.get('/bsTmpletDel/:id', MdRole.bserIsLogin, Tmplet.bsTmpletDel)


	app.post('/bsTmpletAddColorAjax', MdRole.bserIsLogin, postForm, Tmplet.bsTmpletAddColorAjax)
	app.post('/bsTmpletDelColorAjax', MdRole.bserIsLogin, postForm, Tmplet.bsTmpletDelColorAjax)

	app.get('/bsTmpletAjaxTmplets', MdRole.bserIsLogin, Tmplet.bsTmpletAjaxTmplets);
	/* ======================================== template ======================================== */



	/* ======================================== order ======================================== */
	app.get('/bsOrders', MdRole.bserIsLogin, Order.bsOrders);
	app.get('/bsOrderAdd', MdRole.bserIsLogin, Order.bsOrderAdd);
	app.post('/bsOrderNew', MdRole.bserIsLogin, postForm, Order.bsOrderNew)

	app.get('/bsOrder/:id', MdRole.bserIsLogin, Order.bsOrder);
	app.get('/bsOrderDel/:id', MdRole.bserIsLogin, Order.bsOrderDel)
	app.get('/bsOrderEnd/:id', MdRole.bserIsLogin, Order.bsOrderEnd)
	/* ======================================== order ======================================== */


	/* ======================================== cter ======================================== */
	app.get('/bsCters', MdRole.bserIsLogin, Cter.bsCters)
	app.get('/bsCtersAjax', MdRole.bserIsLogin, Cter.bsCtersAjax)

	app.get('/bsCter/:id', MdRole.bserIsLogin, Cter.bsCterFilter, Cter.bsCter)
	app.get('/bsCterDel/:id', MdRole.bserIsLogin, Cter.bsCterFilter, Cter.bsCterDel)
	app.delete('/bsCterDelAjax', MdRole.bserIsLogin, Cter.bsCterDelAjax)
	
	app.post('/bsCterUpd', MdRole.bserIsLogin, postForm, Cter.bsCterUpd)

	app.get('/bsCterAdd', MdRole.bserIsLogin, Cter.bsCterAdd)
	app.post('/bsCterNew', MdRole.bserIsLogin, postForm, Cter.bsCterNew)

	app.get('/ajaxBsCterAdd', MdRole.bserIsLogin, Cter.ajaxBsCterAdd)
	app.get('/ajaxBsCterUp', MdRole.bserIsLogin, Cter.ajaxBsCterUp)
	app.get('/ajaxBsCters', MdRole.bserIsLogin, Cter.ajaxBsCters)
	app.get('/ajaxBsCterAll', MdRole.bserIsLogin, Cter.ajaxBsCterAll)
	/* ======================================== cter ======================================== */

};