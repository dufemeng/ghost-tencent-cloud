'use strict';

var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var moment = require('moment');
var tencentyun = require('tencentyun');
var utils = require(path.join(process.cwd(),'core/server/utils'));

function tencentStore(config) {
	this.options = config || {};
}

tencentStore.prototype.save = function(image) {
	var _this = this;
	var options = _this.options;
	var fileid = 'sample' + parseInt(Date.now() / 1000);

	return new Promise(function(resolve,reject){
		tencentyun.conf.setAppInfo(options.appId,options.secretId,options.secretKey);

		tencentyun.imagev2.upload(image.path,options.bucket,fileid,function(ret){
			// console.log (ret) ;
			if ( ret.code == 0) {
				var fileid = ret.data.fileid;

				//查询
				// tencentyun.imagev2.stat(options.bucket,fileid,function(ret){
				// 	console.log(ret);
				// })

				//复制
				// tencentyun.imagev2.copy(options.bucket, fileid, function(ret) {
		  		//     console.log(ret);
		  		// });

		  		// 生成私密下载url
		        // var expired = parseInt(Date.now() / 1000) + 60;
		        // var sign = tencentyun.auth.getAppSignV2(options.bucket, fileid, expired);
		        // console.log('downloadUrl is : ' + ret.data.downloadUrl + '?sign=' + sign);

		        // 生成新的上传签名
		        // var expired = parseInt(Date.now() / 1000) + 60;
		        // var sign = tencentyun.auth.getAppSignV2(options.bucket, fileid, expired);
		        // console.log('sign is :'+sign);

		        //删除
		        // tencentyun.imagev2.delete(bucket, fileid, function(ret) {
		        //     console.log(ret);
		        // });

		        var imageList = [];
			
		        imageList = imageList.push(ret);

		        console.log(imageList);

				// console.log('images' + ret.data.downloadUrl);
				resolve(ret.data.downloadUrl);
			} else {
				reject(ret.message) ;
			}
		})

	})
}

tencentStore.prototype.serve = function() {
	return function(req,res,next){
		next();
	}
}


tencentStore.prototype.getFileKey = function(image) {
    var prefix = moment().format('YYYY/MM/').replace(/^\//, '');
    var ext = path.extname(image.name);
    var name = utils.safeString(path.basename(image.name, ext));

    return prefix + name + '-' + Date.now() + ext.toLowerCase();
};

module.exports = tencentStore;