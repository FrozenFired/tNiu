let fs = require('fs');
let path = require('path');
var cmpImg = require('compress-images');

let MiddlePicture = {
	deleteOldPhoto : function(orgPhoto, photoDir){
		if(orgPhoto != '/upload' + photoDir + '1.jpg') {
			fs.unlink(path.join(__dirname, '../../public' + orgPhoto), function(err) { });
		}
	},

	addNewPhoto : function(req, res, next) {
		let obj = req.body.obj;			// 获取body数据
		let picName = obj.code;			// body中的code
		let photoDir = obj.photoDir;	// 图片要储存的位置
		// console.log(photoDir)
		let photoData = req.files.uploadPhoto;	// 图片数据
		if(photoData && photoData.originalFilename && photoDir) {
			let filePath = photoData.path;		// 图片的位置
			if(obj.orgPhoto){
				MiddlePicture.deleteOldPhoto(obj.orgPhoto, photoDir);
			}
			fs.readFile(filePath, function(err, data) {
				let type = photoData.type.split('/')[1];		// 图片类型
				let timestamp = Date.now();						// 时间戳
				let photoName = picName + '_' + timestamp + '.' + type;	// 图片名称 code_2340.jpg
				let photoSrc = path.join(__dirname, '../../../public/upload/'+photoDir);	// niu/public/upload/***/
				let photo = photoSrc + photoName;
				fs.writeFile(photo, data, function(err){
					if(err) console.log(err);
					obj.photo = '/upload'+photoDir+photoName;
					next();
				});
			});
		}
		else{
			next();
		}
	},
};

module.exports = MiddlePicture;