var configObj = getApp();
var localhost = configObj.url;
var layer_success = configObj.layer_success;
var layer_tip = configObj.layer_tip;
var layer_error = configObj.layer_error;
var layer_confirm = configObj.layer_confirm;
// 获取表格有多少行
function getPageSize(tableID, boolean) {
    var bool = false;
    var fontSize = parseInt($('html').css('font-size'));
    if (arguments.length == 2) {
        bool = boolean;
    }
    if (arguments.length > 0) {
        var box = document.getElementById(tableID);
    } else {
        var box = document.getElementsByTagName("table")[0];
    }
    var height = box.parentElement.offsetHeight; //获取容器的高度
    if (arguments[1] == false) {
        var actualHeight = height - 0.56 * fontSize; //右边的高度-标题部分的高度-下面分页的高度-容器的padding值-标题哪一行的高度；
    } else {
        var actualHeight = height; //右边的高度-标题部分的高度-下面分页的高度-容器的padding值-标题哪一行的高度；
    }
    var trHeight = 0.56 * fontSize;
    var pagesize = Math.floor(actualHeight / trHeight);
    return pagesize;
}

/**
 * 分页方法
 * liufan
 * 2018-04-18
 * box:分页元素的ID
 * param:{
 *  count:存放的页数
 *  num:获取的页码
 * }
 * calback:获取某一页的方法
 */
function paging(box, param, calback) {
    var box = document.getElementById(box);
    var inputBox = box.getElementsByTagName('input');
    count = param.count;
    var num = 1;
    var num01 = 1;
    var num02 = count /*总数*/ ;
    Background(2);
    removedisable();
    diabledBack(0);
    diabledBack(1);
    inputBox[inputBox.length - 1].removeAttribute('disabled');
    inputBox[inputBox.length - 2].removeAttribute('disabled');
    inputBox[0].setAttribute('disabled', true);
    inputBox[1].setAttribute('disabled', true);
    param['num'] = num;
    if (count < 2) {
        box.parentNode.style.display = "none"
        calback(param);
        return false;
    } else {
        calback(param);
        box.parentNode.style.display = "block";
    }
    if (count == 2) {
        if (inputBox[4].value == '3') {
            if (!!window.ActiveXObject || "ActiveXObject" in window) { //解决ie下不支持remove()
                inputBox[4].removeNode(true);
            } else {
                inputBox[4].remove();
            }
        }
    } else {
        if (inputBox[4].value != '3' && inputBox[4] * 1 == NaN) {
            var newInput = document.createElement('input');
            newInput.setAttribute('type', 'button');
            newInput.setAttribute('value', '3')
            box.insertBefore(newInput, inputBox[4])
        }
    }
    var inputBox = box.getElementsByTagName('input');
    //1 //首页的点击事件
    inputBox[inputBox.length - inputBox.length].onclick = function() {
        Background(2); //给相应的快添加背景
        num01 = 1;
        content(num01);
        num = 1;
        param['num'] = num;
        calback(param);
        removedisable();
        diabledBack(0);
        diabledBack(1);
        inputBox[inputBox.length - 1].removeAttribute('disabled');
        inputBox[inputBox.length - 2].removeAttribute('disabled');
        inputBox[0].setAttribute('disabled', true);
        inputBox[1].setAttribute('disabled', true);
    }
    //2 //尾页的点击事件
    inputBox[inputBox.length - 1].onclick = function() {
        if (num02 < 2) {
            return false;
        }
        Background(inputBox.length - 3);
        num01 = num02 - (inputBox.length - 5);
        content(num01)
        num = num02;
        param['num'] = num;
        calback(param);
        removedisable();
        diabledBack(inputBox.length - 1);
        diabledBack(inputBox.length - 2);
        inputBox[inputBox.length - 1].setAttribute('disabled', true);
        inputBox[inputBox.length - 2].setAttribute('disabled', true);
        inputBox[0].removeAttribute('disabled');
        inputBox[1].removeAttribute('disabled');
    }
    //3 //上一页的点击事件
    inputBox[inputBox.length - (inputBox.length - 1)].onclick = function() {
        for (var j = 0; j < inputBox.length - 4; j++) {
            if (inputBox[j + 2].className == 'background' && inputBox[j + 2].value != 1) {
                if (j + 2 != inputBox.length - (inputBox.length - 2)) {
                    Background(j + 1);
                }
                break;
            }
        }
        if (j + 2 == inputBox.length - (inputBox.length - 2)) {
            num01--;
            content(num01);
        }
        if (num > 1) {
            num--;
        } else {
            num = 1;
        }
        param['num'] = num;
        calback(param);
        removedisable();
        inputBox[0].removeAttribute('disabled');
        inputBox[1].removeAttribute('disabled');
        inputBox[inputBox.length - 1].removeAttribute('disabled');
        inputBox[inputBox.length - 2].removeAttribute('disabled');
        if (num == 1) {
            inputBox[0].setAttribute('disabled', true);
            inputBox[1].setAttribute('disabled', true);
            diabledBack(0);
            diabledBack(1);
        }
    }
    //4 下一页的点击事件
    inputBox[inputBox.length - 2].onclick = function() {
        var index;
        for (var j = 0; j < inputBox.length; j++) {
            if (inputBox[j].className == 'background' && inputBox[j].value < num02) { //* && 写最后一页的总数*/
                if (j + 1 < inputBox.length - 2) {
                    Background(j + 1);
                    index = inputBox[j + 1].value;
                }
                break;
            }
        }
        if (j + 1 == inputBox.length - 2) {
            num01++;
            content(num01);
        }
        if (num == num02) {
            num == num02;
        } else {
            num++;
        }
        param['num'] = num;
        calback(param);
        removedisable();
        inputBox[0].removeAttribute('disabled');
        inputBox[1].removeAttribute('disabled');
        inputBox[inputBox.length - 1].removeAttribute('disabled');
        inputBox[inputBox.length - 2].removeAttribute('disabled');
        if (num == num02) {
            diabledBack(inputBox.length - 1);
            diabledBack(inputBox.length - 2);
            inputBox[inputBox.length - 1].setAttribute('disabled', true);
            inputBox[inputBox.length - 2].setAttribute('disabled', true);
        }
    }
    //     分页的点击事件
    for (var i = 0; i < inputBox.length - 4; i++) {
        inputBox[i + 2].index = i + 2;
        inputBox[i + 2].onclick = function() {
            Background(this.index);
            num = this.value;
            param['num'] = num;
            calback(param);
            removedisable();
            inputBox[inputBox.length - 1].removeAttribute('disabled');
            inputBox[inputBox.length - 2].removeAttribute('disabled');
            inputBox[0].removeAttribute('disabled');
            inputBox[1].removeAttribute('disabled');
            if (num == 1) {
                inputBox[0].setAttribute('disabled', true);
                inputBox[1].setAttribute('disabled', true);
                diabledBack(0);
                diabledBack(1);
            }
            if (num == num02) {
                inputBox[inputBox.length - 1].setAttribute('disabled', true);
                inputBox[inputBox.length - 2].setAttribute('disabled', true);
                diabledBack(inputBox.length - 1);
                diabledBack(inputBox.length - 2);
            }
        }
    }
    //把所有的分页背景去掉，给指定的分页添加背景颜色
    function Background(num) {
        for (var i = 0; i < inputBox.length; i++) {
            inputBox[i].className = inputBox[i].className.replace('background', '');
            inputBox[num].className = 'background';
        }
    }

    function diabledBack(num) {
        inputBox[num].classList.add("disabled");
    }

    function removedisable() {
        for (var i = 0; i < inputBox.length; i++) {
            inputBox[i].classList.remove("disabled");
        }
    }
    content(num01);

    function content(number) {
        for (var i = 0; i < inputBox.length - 4; i++) {
            inputBox[i + 2].value = number;
            number++;
        }
    }
}

/**
 * ajax封装
 * liufan
 * 20180529
 */
function ajax_data(ajax_type, ajax_url, json_data, func, async) { //data数据可以为空
    var dataObj = {};
    for (var i in json_data) {
        dataObj[i] = json_data[i];
    }
    var async;
    if (arguments.length >= 5) {
        async = arguments[4];
    } else {
        async = true;
    }
    var timmer = getTimmer();
    var lostData = setDataEncode(json_data, timmer);
    var loadingName = ajax_url.substring(ajax_url.lastIndexOf('/') + 1);
    var myDate = new Date();
    var Time = myDate.toLocaleString()
    $('body').loading({
        title:  "加载中...",
        discColor: '#fff',
        name: loadingName,
        discription: '',
        direction: 'column',
        type: 'origin',
        // originBg:'#71EA71',
        loadingBg:'rgba(0,0,0,0.3)',
        originDivWidth:40,
        originDivHeight:40,
        originWidth:6,
        originHeight:6,
		smallLoading: false,
        loadingMaskBg: 'rgba(0,0,0,0.2)'
    });
    dataObj.time = timmer;
    dataObj.key = lostData;
    $.ajax({
        type: ajax_type,
        url: ajax_url,
        dataType: "json",
        data: dataObj,
        crossDomain: true,
        async: async,
        xhrFields: {
            withCredentials: true
        },
        beforSend: function(xhr) {

        },
        error: function(data) {
            //请求失败时被调用的函数
            // console.log(data);
        },
        success: function(data) {
            if (data.code == "0" || data.code == "666") {
                func(data.data);
            } else {
                switch (data.code) {
                    case 1:
                    case 2:
                    case 3:
                        if (ajax_url.indexOf('video/subImg') < 0) {
                            layer.alert(data.msg, {
                                title: "系统提示",
                                skin: "layer_error"
                            });
                        }
                        break;
                    case 98:
                        layer.alert(data.msg, {
                            title: "登录失败",
                            skin: 'layer_error'
                        });
                        break;
                    case 99:
                        //未登陆
                        layer.alert('未登录,请先登录', {
                            title: "登录失败",
                            skin: 'layer_error'
                        }, function() {
                            window.location.href = '../../pages/login/login.html';
                        });
                        break;
                    case 100:
                        //无权限

                        break;
                }
            }
        },
        complete: function() {
            removeLoading(loadingName);
        }
    });
}

function setDataEncode(data, timmer) {
    data.time = timmer;
    data.secretKey = "936201f25ba84be1a5c3225430c1d509";
    var arr = [];
    for (var i in data) {
        if (data[i] != null) {
            data[i] = getString(data[i]);
            arr.push(i.toString())
        } else {
            console.log(i + '=' + data[i]);
        }
    }
    arr.sort();
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var val = arr[i];
        obj[val] = data[val].toString();
    }
    var str = "";
    for (var j in obj) {
        str += j;
        str += obj[j];
    }
    //加密前的字符串
    //       console.log(str);
    var md5val = md5(str);
    return md5val;
}

function getString(value) {
    switch (typeof value) {
        case 'number':
            return value.toString();
            break;
        case 'string':
            return value;
            break;
        case 'boolean':
            return value.toString();
            break;
        case 'object':
            if (value instanceof Array) {
                var arr = [];
                for (var i = 0; i < value.length; i++) {
                    arr.push(getString(value[i]));
                }
                return "[" + arr.toString() + "]";
            } else {
                var obj = {};
                for (var i in value) {
                    obj[i] = getString(value[i])
                }
                return JSON.stringify(obj);
            }
            break;
    }
}
/**
 * 获取服务器时间     hxl 实时刷新时间
 * liufan
 * 20180605
 */     
function getTimmer() {
    var timmer = '';
    var url = getApp().url;
    $.ajax({
        type: 'post',
        url: url + 'login/times',
        dataType: "json",
        data: {},
        async: false,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            // if(data.code=="0"){
            timmer = data;
            // }else{
            //   layer.alert(data.msg);
            // }
        },
        error: function(err, b, c) {
            // console.log(err);
            // console.log(b);
            // console.log(c);
        }
    });
    var myDate = new Date();
    var mytime=myDate.toLocaleTimeString();
    var hour = myDate.getHours()<"10"?"0"+myDate.getHours():myDate.getHours();      //获取当前小时数(0-23)
    var minute = myDate.getMinutes()<"10"?"0"+myDate.getMinutes():myDate.getMinutes();  //获取当前分钟数(0-59)
    var seconds = myDate.getSeconds()<"10"?"0"+myDate.getSeconds():myDate.getSeconds(); //获取当前秒数(0-59)
    var mytime =  hour +":"+minute+":"+seconds;
 	$('.newdate p span').html(mytime);
     return timmer;
     
}
// 判断页面中是否加载某个js或者css了
function isInclude(name) {
    var js = /js$/i.test(name);
    var es = document.getElementsByTagName(js ? 'script' : 'link');
    for (var i = 0; i < es.length; i++)
        if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;
    return false;
}

function AddJsFiles(URL, FileType) {
    var oHead = document.getElementsByTagName('head').item(0);
    var oBody = document.getElementsByTagName('body').item(0);

    var addheadfile;
    if (FileType == "js") {
        addheadfile = document.createElement("script");
        addheadfile.type = "text/javascript";
        addheadfile.src = URL;
        oBody.appendChild(addheadfile);
    } else {
        addheadfile = document.createElement("link");
        addheadfile.type = "text/css";
        addheadfile.rel = "stylesheet";
        addheadfile.rev = "stylesheet";
        addheadfile.media = "screen";
        addheadfile.href = URL;
        oHead.appendChild(addheadfile);
    }
}
/**
 * @Author      liufan
 * @DateTime    2018-06-15
 * @description 日期格式化
 * @param       {[type]}    data 时间字符串2018-06-15
 * @return      {[type]}         [description]
 */
function formData(data, type) {
    if (data == null || data == "") {
        return '';
    }
    var date = new Date(data);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    if (arguments.length < 2 || type == '1') {
        return y +""+ m +""+ d;
    } else if (type == '2') {
        return y + m + d + h + minute + second;
    } else if (type == '3') {
        return y + '-' + m + '-' + d;
    }

}
/**
 * 获取工地信息
 * @return {[type]} [description]
 */
function getCompanyInfo() {
    var data = {};
    var url = getApp().url + 'project/queryInfo';
    ajax_data("post", url, data, function(data) {
        var dataStr = JSON.stringify(data);
        sessionStorage.setItem("PROJECT_INFO", dataStr);
    }, false);
};

/**
 * @Author      liufan
 * @DateTime    2018-06-25
 * @description 获取模块列表
 * @param       {[type]}    moduleId 父模块id，如果没有的话传''
 * @return      {[type]}             [description]
 */
function getLotList(moduleId) {
    var result;
    var data = {
        parentId: moduleId
    }
    var url = getApp().url + 'jurisdiction/permission';
    ajax_data("post", url, data, function(data) {
        result = data;
    }, false);
    return result;
}
/**
 * 显示人员详情
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function showPersonInfo(id) {
    var url = getApp().url + 'personRealName/personInfo';
    var data = {
        sort: id
    }
    ajax_data("post", url, data, function(data) {
        // console.log(data);
        $('.personInfoMask').show();
        $('.personInfoBox').show();
        var sort = data.sort; //人员序号
        var type = data.type; //人员类型 1管理 2劳务
        var name = data.name; //姓名
        var code = data.code || '--'; //身份证号
        var sex = data.sex; //性别 1 男 2 女
        var age = data.age; //年龄
        var photo = data.photo; //头像
        var birthplace = data.birthplace; //籍贯
        var telephone = data.telephone; //手机号码
        var companyName = data.companyName; //企业名称
        var groupName = data.groupName; //班组
        var workTypeName = data.workTypeName; //工种
        var deptName = data.deptName; //管理人员部门
        var postName = data.postName; //岗位
        var groupLeader = data.groupLeader; //是否是班组长
        var empNo = data.empNo; //工号
        var photoPath = data.photoPath; //头像路径
        var certificationsData = data.certificationsData; //资质证书
        var contractData = data.contractData; //合同
        var contractPath=data.contractPath;
        var certificationsPath=data.certificationsPath;
        var dateIn=data.dateIn||'--';
        $('.contractBox').html('<ul id="contractUl"></ul>');
        $('.aptitudeBox').html('<ul id="aptitudeUl"></ul>');
        $('.Pername').text(name);
        $('.dateIn').text(dateIn);
        var perSex = (sex == '1') ? "男" : "女";
        $('.persex').text(perSex);
        $('.perAge').text(age);
        $('.birthplace').text(birthplace);
        $('.perCode').text(code);
        $('.pertelephone').text(telephone);
        $('.percompanyName').text(companyName);
        getTrainCount(empNo);//获取培训记录
        if (type == "1") {
            $('.manage').show();
            $('.labor').hide();
            $('.perdeptName').text(deptName);
            $('.perpostName').text(postName);
        } else {
            $('.manage').hide();
            $('.labor').show();
            $('.pergroupName').text(groupName);
            var islabor = (groupLeader == 1) ? "是" : "否";
            $('.perisLabor').text(islabor);
            $('.workTypeName').text(workTypeName);
        }
        $('.perempNo').text(empNo);
        var imgSrc = photoPath + photo;
        $('.headPortrait').html('<img src="' + imgSrc + '" />');
        $('.personInfoTop>.close').off('click').on('click', function() {
            $('.personInfoMask').hide();
        });
        $('#aptitudeUl').html('');
        for (var i = 0, len = certificationsData.length; i < len; i++) {
            var obj = certificationsData[i];
            var src = obj.src;
            var uuid = obj.uuid;
            if (src == '' || uuid == '') {
                continue;
            } else {
                var str = '<li data-uuid="'+uuid+'"><span class="del"></span><img src="' +certificationsPath+ src + '" data-name="' + src + '" alt /></li>';
                $('#aptitudeUl').append(str);
            }
        }
        if($('#aptitudeUl>li').length>3){
            $('#aptitudeUl').bxSlider({
                slideWidth: 200,
                minSlides: 2,
                maxSlides: 2,
                moveSlides: 1,
                slideMargin: 10,
                pager: false,
                infiniteLoop: false
            });
        }else if($('#aptitudeUl>li').length==3){
            $('#aptitudeUl>li').eq(2).css('margin-right',0);
        }
        $('#contractUl').html('');
        for (var i = 0, len = contractData.length; i < len; i++) {
            var obj = contractData[i];
            var src = obj.src;
            var uuid = obj.uuid;
            if (src == '' || uuid == '') {
                continue;
            } else {
                var str = '<li data-uuid="'+uuid+'"><span class="del"></span><img src="' +contractPath+ src + '" data-name="' + src + '" alt /></li>';
                $('#contractUl').append(str);
            }
        }
        if($('#contractUl>li').length>3){
            $('#contractUl').bxSlider({
                slideWidth: 200,
                minSlides: 2,
                maxSlides: 2,
                moveSlides: 3,
                slideMargin: 10,
                pager: false,
                infiniteLoop: false
            });
        }else if($('#contractUl>li').length==3){
            $('#contractUl>li').eq(2).css('margin-right',0);
        }

        // 上传资质证书
        $('.upImgBtnCer').off('click').on('click', function() {
            if ($('#aptitudeUl>li').length < 5) {
                $('#updateSpan').click();
            }else{
                layer.alert('上传数量已经超过限制',{title:layer_tip,skin:'layer_tip',time:500});
            }
        });
        // 删除资质证书
        $('#aptitudeUl>li>.del').off('click').on('click',function(){
            var fileName=$(this).siblings('img').attr('data-name');
            var uuid=$(this).parent().attr('data-uuid');
            delImg(6,uuid,fileName);
        });
        // 上传合同
        $('.upImgBtnCon').off('click').on('click', function() {
            if ($('#contractUl>li').length <5) {
                $('#updateSpanCon').click();
            }else{
                layer.alert('上传数量已经超过限制',{title:layer_tip,skin:'layer_tip',time:500});
            }
        });
                // 删除合同
        $('#contractUl>li>.del').off('click').on('click',function(){
            var fileName=$(this).siblings('img').attr('data-name');
            var uuid=$(this).parent().attr('data-uuid');
            delImg(5,uuid,fileName);
        });
    }, false);
}

function delImg(type,uuid,fileName){
    var localhost=getApp().url;
    var data={
        uuid:uuid,
        fileName:fileName
    }
    if(type=='5'){
        var url=localhost+'contract/delete';
    }else{
        var url=localhost+'certifications/delete';
    }
    ajax_data("post", url, data, function(data){
        // console.log(data);
        $('li[data-uuid="'+uuid+'"]').remove();
        if(type=='5'){
            var cloneDemo=$('#contractUl').clone();
            $('.contractBox').html(cloneDemo);
            $('#contractUl .bx-clone').remove();
            if($('#contractUl>li').length>3){
                $('#contractUl').bxSlider({
                                    slideWidth: 200,
                minSlides: 2,
                maxSlides: 2,
                moveSlides: 3,
                slideMargin: 10,
                pager: false,
                infiniteLoop: false
                });
            }else if($('#contractUl>li').length==3){
                $('#contractUl').removeAttr('style');
                $('#contractUl>li').eq(2).css('margin-right',0);
            }else{
                $('#contractUl').removeAttr('style');
            }
        }else{
            var cloneDemo=$('#aptitudeUl').clone();
            $('.aptitudeBox').html(cloneDemo);
            $('#aptitudeUl .bx-clone').remove();
            if($('#aptitudeUl>li').length>3){
                $('#aptitudeUl').bxSlider({
                                    slideWidth: 200,
                minSlides: 2,
                maxSlides: 3,
                moveSlides: 3,
                slideMargin: 10,
                pager: false,
                infiniteLoop: false
                });
            }else if($('#aptitudeUl>li').length==3){
                $('#aptitudeUl').removeAttr('style');
                $('#aptitudeUl>li').eq(2).css('margin-right',0);
            }else{
                $('#aptitudeUl').removeAttr('style');
            }
        }
                // 删除合同
        $('#contractUl>li>.del').off('click').on('click',function(){
            var fileName=$(this).siblings('img').attr('data-name');
            var uuid=$(this).parent().attr('data-uuid');
            delImg(5,uuid,fileName);
        });
                // 删除资质证书
        $('#aptitudeUl>li>.del').off('click').on('click',function(){
            var fileName=$(this).siblings('img').attr('data-name');
            var uuid=$(this).parent().attr('data-uuid');
            delImg(6,uuid,fileName);
        });
    });
}
/**
 * 判断图片是否存在
 * @param  {[type]} pathImg [description]
 * @author liufan 2018-07-23T15:02:14+080 {Boolean}  [description]
 */
function isHasImg(pathImg) {
    var ImgObj = new Image();
    ImgObj.src = pathImg;
    if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return true;
    } else {
        return false;
    }
}
/**
 * 防止事件冒泡
 * @param  {[type]} e [description]
 * @author liufan 2018-07-30T15:11:51+080 {[type]}  [description]
 */
function stopBubble(e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if (e && e.stopPropagation)
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    else
        //否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
}
/**
 * @Author   LiuFan
 * @DateTime 2018-09-29
 * @param    {String}
 * @param    {[type]}
 * @return   {[type]}
 */
function getTrainCount(_empNo){
    var data={
        empNo:_empNo,
        pageSize:3
    }
    var url=localhost+'training/queryCount';
    ajax_data("post", url, data, function(data) {
        // var params = data2;
        var param = {
            count: data,
            empNo:_empNo
        }
        if(data > 0) {
            paging('pagingTranin', param, getTrainList);
        } else {
            $('.paging').hide();
            $('#traninTable tbody').html('<tr><td colspan="6">暂无培训</td></tr>');
        }
    });
}
/**
 * @Author   LiuFan
 * @DateTime 2018-09-29
 * @param    {String}
 * @param    {[type]}
 * @return   {培训记录列表}
 */
function getTrainList(param){
    var data={
     empNo:param.empNo,
        pageNum:param.num,
        pageSize:3
    }
    var url=localhost+'training/queryList';
    ajax_data("post", url, data, function(data) {
        // console.log(data);
        $('#traninTable tbody').html('');
        var len=data.length;
        for(var i=0;i<len;i++){
            var obj=data[i];
            var j=i+1;
            var name=obj.name;
            var time=obj.time;
            var score=obj.score;
            var isQualified=obj.isQualified;
            var uuid=obj.uuid;
            if(isQualified==1){
                var passName="合格";
            }else{
                var passName='不合格';
            }
            var str='<tr data-uuid="'+uuid+'"><td>'+j+'</td><td>'+name+'</td><td>'+time+'</td><td>'+score+'</td><td>'+passName+'</td><td><input type="button" value="编辑" class="editTraninBtn"><input type="button" value="删除" class="delTraninBtn"></td></tr>';
            $('#traninTable tbody').append(str);
        }
        $('.delTraninBtn').off('click').on('click',function(){
            var uuid=$(this).parent().parent().attr('data-uuid');
            layer.confirm('是否删除该记录？',function(){
                delTranin(uuid);
            })
        });
        $('.editTraninBtn').off('click').on('click',function(){
            var uuid=$(this).parent().parent().attr('data-uuid');
            showTraninInfo(uuid);
        });
    });
}
function showTraninInfo(uuid){
    var data={
        uuid:uuid
    }
    var url=localhost+'training/queryById';
    ajax_data("post", url, data, function(data) {
        $('.addTraninBox').show();
        var uuid=data.uuid;
        var name=data.name;
        var time=data.time;
        var score=data.score;
        var isQualified=data.isQualified;
        var code=data.code;
        var empNo=data.empNo;
        $('#trainName').val(name);
        $('#trainTime').val(time);
        $('#trainGrade').val(score);
        $('#trainIsPass').val(isQualified);
        $('.traninSubmitBtn').off('click').on('click',function(){
            editRecord(empNo,code,uuid);
        });

    });
}
/**
 * @Author   LiuFan
 * @DateTime 2018-09-29
 * @param    {String}
 * @param    {删除记录}
 * @return   {[type]}
 */
function delTranin(_uuid){
    var data={
        uuid:_uuid
    }
    var url=localhost+'training/delete';
    ajax_data("post", url, data, function(data) {
        layer.alert('删除成功',{skin:'layer_success',time:1000});
        var empNo=$('.occupationInfomation .perempNo').text();
        getTrainCount(empNo);
    });
}
$('.traniningTop .addRecord').on('click',function(){
    $('.addTraninBox').show();
    $('#trainName').val('');
    $('#trainTime').val(formData(new Date(),3));
    $('#trainGrade').val('');
    $('#trainIsPass').val('1');
    var empNo=$('.occupationInfomation .perempNo').text();
    var code=$('.perCode').text();
    $('.traninSubmitBtn').off('click').on('click',function(){
        editRecord(empNo,code,'');
    });
});
/**
 * 添加培训记录
 * @param  {[empNo]} e [人员编号]
 * @param  {[code]} e [身份证号]
 * @param  {[uuid]} e [数据id]
 * @author liufan 2018-07-30T15:11:51+080 {[type]}  [description]
 */
function editRecord(_empNo,_code,_uuid){
    var name=$.trim($('#trainName').val());
    var time=$('#trainTime').val();
    var score=$('#trainGrade').val();
    var isQualified=$('#trainIsPass').val();
    if(name.length>32){
        layer.alert('培训名称过长',{skin:'layer_tip',time:1000});
        return false;
    }else if(name.length==0){
        layer.alert('培训名称不能为空',{skin:'layer_tip',time:1000});
        return false
    }
    if(time==''){
        layer.alert('请选择培训时间',{skin:'layer_tip',time:1000});
        return false
    }else if(new Date(time).getTime()==NaN){
        layer.alert('日期格式不正确',{skin:'layer_tip',time:1000});
        return false       
    }
    if(isNaN(score)==false&&parseFloat(score)!=NaN){

    }else{
        layer.alert('培训成绩请输入数字',{skin:'layer_tip',time:1000});
        return false        
    }
    if(score==''){
        layer.alert('请输入培训成绩',{skin:'layer_tip',time:1000});
        return false;
    }
    var data={
        uuid:_uuid,
        empNo:_empNo,
        code:_code,
        name:name,
        trainingTime:time,
        score:score,
        isQualified:isQualified
    }
    var url=localhost+'training/edit';
    ajax_data("post", url, data, function(data){
        // console.log(data);
        $('.addTraninBox').hide();
        layer.alert('操作成功',{skin:'layer_success',time:1000});
        getTrainCount(_empNo);
    });
}
$('.traninCancelBtn').on('click',function(){
    $('.addTraninBox').hide();
});