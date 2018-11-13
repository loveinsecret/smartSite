$(function(){
	var localhost=getApp().url;
	$('#userName').focus();
	var login=function(){
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		var isIE = userAgent.indexOf('NET') != -1 && userAgent.indexOf("rv") != -1; //判断是否IE浏览器
		var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
		if(isIE){
			layer.confirm('请使用其他浏览器打开本平台,360或者谷搜狗浏览器请切换到极速模式',{"title":"友情提示"},function(){
				window.location.href = '../../pages/login/login.html';
			},function(){
				window.location.href = '../../pages/login/login.html';
			});
			return false;
		}
		var userName=$.trim($('#userName').val());
		var password=$.trim($('#password').val());
		var url=localhost+'login/loginCheck';
		var pwd=md5(password);
		var data={
			"userName":userName,
			"password":pwd
		}
		if(userName==''){
			$('#userName').focus();
			layer.alert('请输入用户名');
			return false;
		}
		if(password==''){
			$('#password').focus();
			layer.alert('请输入密码');
			return false;
		}
		// console.log(data)
		ajax_data("post", url, data, function(data){
			// console.log(data);
			var dataStr=JSON.stringify(data);
			sessionStorage.setItem('PROJECT_LOGIN',dataStr);
			window.location.href="../../index.html#/";
		});
	}
	$('#submit').on('click',function(){
		login();
	});

	// 效果
	$('.codeBtn').on('click',function(){
		var parentEle=$(this).parent();
		parentEle.hide();
		parentEle.siblings('.brother').show();
	});
	document.onkeydown=keyDownSearch;
	function keyDownSearch(e) {
			// 兼容FF和IE和Opera
			var theEvent = e || window.event;
			var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
			if (code == 13) {
				$("#submit").click(); //调用登录按钮的登录事件
					return false;
			}
			return true;
	}
})
