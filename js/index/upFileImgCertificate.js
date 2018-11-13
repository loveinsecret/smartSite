var configObj = getApp();
var localhost = configObj.url;
cert_accessid = ''
cert_accesskey = ''
cert_host = ''
cert_policyBase64 = ''
cert_signature = ''
cert_filename = ''
cert_callbackbody = ''
cert_key = ''
cert_expire = 0
cert_g_object_name = ''
cert_g_object_name_type = ''
cert_now = cert_timestamp = Date.parse(new Date()) / 1000;

function send_request_Img_Cert() {
	var responseText;
	var data = {
		type: 6
	}
	var url = localhost + 'proUpFile/webUpFile';
	ajax_data('post', url, data, function(data) {
		responseText = data;
	}, false);
	return responseText;
};

function check_object_radio() {
	var tt = document.getElementsByName('myradio');
	for (var i = 0; i < tt.length; i++) {
		if (tt[i].checked) {
			cert_g_object_name_type = tt[i].value;
			break;
		}
	}
}

function get_signature_Img_Cert() {
	//可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
	cert_now = cert_timestamp = Date.parse(new Date()) / 1000;
	if (cert_expire < cert_now + 3) {
		body = send_request_Img_Cert();
		//      console.log(body)
		cert_host = body.host;
		cert_policyBase64 = body.policy;
		cert_accessid = body.accessid;
		cert_signature = body.signature;
		cert_expire = body.expire;
		// callbackbody = body.
		cert_key = body.dir;
		return true;
	}
	return false;
};

function random_string(len) {　　
	len = len || 32;　　
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　　
	var maxPos = chars.length;　　
	var pwd = '';　　
	for (i = 0; i < len; i++) {　　
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

function get_suffix(cert_filename) {
	pos = cert_filename.lastIndexOf('.')
	suffix = ''
	if (pos != -1) {
		suffix = cert_filename.substring(pos)
	}
	return suffix;
}

function calculate_object_name_Cer(cert_filename) {
	if (cert_g_object_name_type == 'local_name') {
		cert_g_object_name += "${cert_filename}"
	} else if (cert_g_object_name_type == 'random_name') {
		suffix = get_suffix(cert_filename);
		var timmer = new Date().getTime();
		cert_g_object_name = cert_key + timmer + suffix; //生产随机文件名
		// console.log(cert_g_object_name)
	}
	return ''
}

function get_uploaded_object_name_cert(cert_filename) {
	if (cert_g_object_name_type == 'local_name') {
		tmp_name = cert_g_object_name
		tmp_name = tmp_name.replace("${cert_filename}", cert_filename);
		return tmp_name
	} else if (cert_g_object_name_type == 'random_name') {
		return cert_g_object_name
	}
}

function set_upload_param_Img_Cert(up, cert_filename, ret) {
	if (ret == false) {
		ret = get_signature_Img_Cert()
	}
	cert_g_object_name = cert_key;
	// console.log(cert_filename)
	if (cert_filename != '') {
		suffix = get_suffix(cert_filename)
		calculate_object_name_Cer(cert_filename)
	}
	new_multipart_params = {
		'key': cert_g_object_name,
		'policy': cert_policyBase64,
		'OSSAccessKeyId': cert_accessid,
		'success_action_status': '200', //让服务端返回200,不然，默认会返回204
		// 'callback' : callbackbody,
		'signature': cert_signature,
	};

	up.setOption({
		'url': cert_host,
		'multipart_params': new_multipart_params
	});

	up.start();

}

var uploader_Img_Cert = new plupload.Uploader({
	runtimes: 'html5,flash,silverlight,html4',
	browse_button: 'upLoadImgCert',
	multi_selection: false,
	container: document.getElementById('uploadImgCertBox'),
	flash_swf_url: '../plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url: '../plupload-2.1.2/js/Moxie.xap',
	url: 'http://oss.aliyuncs.com',

	filters: {
		mime_types: [ //只允许上传图片和zip,rar文件
			{
				title: "Image files",
				extensions: "jpg,gif,png,bmp,jpeg"
			}
		],
		max_file_size: '1mb', //最大只能上传10mb的文件
		// prevent_duplicates: true //不允许选取重复文件
	},

	init: {
		PostInit: function() {
			document.getElementById('ossfile_Img_Cert').innerHTML = '';
			set_upload_param_Img_Cert(uploader_Img_Cert, '', false);
			return false;
			//			document.getElementById('postfiles').onclick = function() {
			//			};
		},

		FilesAdded: function(up, files) {
			plupload.each(files, function(file) {
				//				console.log(file)
			});
			//			开始上传
			set_upload_param_Img_Cert(uploader_Img_Cert, '', false);
			return false;
		},

		BeforeUpload: function(up, file) {
			// check_object_radio();
			cert_g_object_name_type = 'random_name';
			console.log(file.name)
			set_upload_param_Img_Cert(up, file.name, true);
		},

		UploadProgress: function(up, file) {
			var d = document.getElementById(file.id);
			//			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			//          var prog = d.getElementsByTagName('div')[0];
			//			var progBar = prog.getElementsByTagName('div')[0]
			//			progBar.style.width= 2*file.percent+'px';
			//			progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded: function(up, file, info) {
			// console.log(file)
			if (info.status == 200) {
				//              document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name);
				var imgSrc = cert_host + '/' + get_uploaded_object_name_cert(file.name);
				var data_src = get_uploaded_object_name_cert(file.name).split('/')[1];
				var str = '<li><span class="del"></span><img src="' + imgSrc + '" alt=""  data-name="' + data_src + '"></li>';
				$('#aptitudeUl').append(str);
				var cloneDemo = $('#aptitudeUl').clone();
				$('.aptitudeBox').html(cloneDemo);
				$('#aptitudeUl .bx-clone').remove();
				//        	if($('#aptitudeUl>li').length>=3){
				// $('#contractUl').bxSlider({
				// 	slideWidth: 200,
				// 	minSlides: 1,
				// 	maxSlides: 3,
				// 	moveSlides:3,
				// 	slideMargin: 10,
				// 	pager: false,
				// 	infiniteLoop:true
				// });
				//        	}
				// console.log('上传成功')
				saveCertificate(data_src)
				uploader_Img_Cert.removeFile(file);
			} else {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
			}
		},

		Error: function(up, err) {
			if (err.code == -600) {
				layer.alert("上传文件不能超过1mb哦!")
				//              document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"));
			} else if (err.code == -601) {

				//              document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"));
			} else if (err.code == -602) {
				layer.alert('这个文件已经上传过一遍了')
				//              document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经上传过一遍了"));
			} else {
				document.getElementById('console_Img_Cert').appendChild(document.createTextNode("\nError xml:" + err.response));
			}
		}
	}
});

uploader_Img_Cert.init();


function saveCertificate(imgName) {
	var localhost = getApp().url;
	var empNo = $('.occupationInfomation .perempNo').text();
	var code = $('.perCode').text();
	var data = {
		src: imgName,
		uuid: '',
		empNo: empNo,
		code: code
	}
	// console.log(data);
	var url = localhost + 'certifications/edit';
	ajax_data("post", url, data, function(data) {
		// console.log(data);
		$('#aptitudeUl>li').eq($('#aptitudeUl>li').length - 1).attr('data-uuid', data);
		if ($('#aptitudeUl>li').length > 3) {
			$('#aptitudeUl').bxSlider({
				slideWidth: 200,
				minSlides: 1,
				maxSlides: 3,
				moveSlides: 1,
				slideMargin: 10,
				pager: false,
				infiniteLoop: false
			});
		} else if ($('#aptitudeUl>li').length == 3) {
			$('#aptitudeUl').removeAttr('style');
			$('#aptitudeUl>li').eq(2).css('margin-right', 0);
		}else{
			$('#aptitudeUl').removeAttr('style');
		}
		// 删除资质证书
		$('#aptitudeUl>li>.del').off('click').on('click', function() {
			var fileName = $(this).siblings('img').attr('data-name');
			var uuid = $(this).parent().attr('data-uuid');
			delImg(6, uuid, fileName);
		});
	});
}
