var configObj = getApp();
var localhost = configObj.url;
accessid = ''
accesskey = ''
host = ''
policyBase64 = ''
signature = ''
callbackbody = ''
filename = ''
key = ''
expire = 0
g_object_name = ''
g_object_name_type = ''
now = timestamp = Date.parse(new Date()) / 1000;

function send_request_Img_Con() {
	var responseText;
	var data = {
		type: 5
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
			g_object_name_type = tt[i].value;
			break;
		}
	}
}

function get_signature_Img_Con() {
	//可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
	now = timestamp = Date.parse(new Date()) / 1000;
	if (expire < now + 3) {
		body = send_request_Img_Con();
		//      console.log(body)
		host = body.host;
		policyBase64 = body.policy;
		accessid = body.accessid;
		signature = body.signature;
		expire = body.expire;
		// callbackbody = body.
		key = body.dir;
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

function get_suffix(filename) {
	pos = filename.lastIndexOf('.')
	suffix = ''
	if (pos != -1) {
		suffix = filename.substring(pos)
	}
	return suffix;
}

function calculate_object_name(filename) {
	if (g_object_name_type == 'local_name') {
		g_object_name += "${filename}"
	} else if (g_object_name_type == 'random_name') {
		suffix = get_suffix(filename);
		var timmer = new Date().getTime();
		g_object_name = key + timmer + suffix; //生产随机文件名
	}
	return ''
}

function get_uploaded_object_name(filename) {
	if (g_object_name_type == 'local_name') {
		tmp_name = g_object_name
		tmp_name = tmp_name.replace("${filename}", filename);
		return tmp_name
	} else if (g_object_name_type == 'random_name') {
		return g_object_name
	}
}

function set_upload_param_Img_Con(up, filename, ret) {
	if (ret == false) {
		ret = get_signature_Img_Con()
	}
	g_object_name = key;
	if (filename != '') {
		suffix = get_suffix(filename)
		calculate_object_name(filename)
	}
	new_multipart_params = {
		'key': g_object_name,
		'policy': policyBase64,
		'OSSAccessKeyId': accessid,
		'success_action_status': '200', //让服务端返回200,不然，默认会返回204
		// 'callback' : callbackbody,
		'signature': signature,
	};

	up.setOption({
		'url': host,
		'multipart_params': new_multipart_params
	});

	up.start();

}

var uploader_Img_Con = new plupload.Uploader({
	runtimes: 'html5,flash,silverlight,html4',
	browse_button: 'upLoadImgCon',
	multi_selection: false,
	container: document.getElementById('uploadImgConBox'),
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
			document.getElementById('ossfile_Img_Con').innerHTML = '';
			set_upload_param_Img_Con(uploader_Img_Con, '', false);
			return false;
			//			document.getElementById('postfiles').onclick = function() {
			//			};
		},

		FilesAdded: function(up, files) {
			plupload.each(files, function(file) {
				//				console.log(file)
			});
			//			开始上传
			set_upload_param_Img_Con(uploader_Img_Con, '', false);
			return false;
		},

		BeforeUpload: function(up, file) {
			// check_object_radio();
			g_object_name_type = 'random_name';
			set_upload_param_Img_Con(up, file.name, true);
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
				var imgSrc = host + '/' + get_uploaded_object_name(file.name);
				var data_src = get_uploaded_object_name(file.name).split('/')[1];
				var str = '<li><span class="del"></span><img src="' + imgSrc + '" alt=""  data-name="' + data_src + '"></li>';
				$('#contractUl').append(str);
				var cloneDemo = $('#contractUl').clone();
				$('.contractBox').html(cloneDemo);
				$('#contractUl .bx-clone').remove();
				//        	if($('#contractUl>li').length>=3){
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
				saveContract(data_src)
				uploader_Img_Con.removeFile(file);
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
				document.getElementById('console_Img_Con').appendChild(document.createTextNode("\nError xml:" + err.response));
			}
		}
	}
});

uploader_Img_Con.init();


function saveContract(imgName) {
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
	var url = localhost + 'contract/edit';
	ajax_data("post", url, data, function(data) {
		// console.log(data);
		$('#contractUl>li').eq($('#contractUl>li').length - 1).attr('data-uuid', data);
		if ($('#contractUl>li').length >= 3) {
			$('#contractUl').bxSlider({
				slideWidth: 200,
				minSlides: 1,
				maxSlides: 3,
				moveSlides: 3,
				slideMargin: 10,
				pager: false,
				infiniteLoop: false
			});
		} else if ($('#contractUl>li').length == 3) {
			$('#contractUl').removeAttr('style');
			$('#contractUl>li').eq(2).css('margin-right', 0);
		}else{
			$('#contractUl').removeAttr('style');
		}
		                // 删除合同
        $('#contractUl>li>.del').off('click').on('click',function(){
            var fileName=$(this).siblings('img').attr('data-name');
            var uuid=$(this).parent().attr('data-uuid');
            delImg(5,uuid,fileName);
        });
	});
}
