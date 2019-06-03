var Common = {
    //日期格式化
    TimeFormatter: function (value, rec, index) {
        if (value == undefined) {
            return "";
        }
        /*json格式时间转js时间格式*/
        value = value.substr(1, value.length - 2);
        var obj = eval('(' + "{Date: new " + value + "}" + ')');
        var dateValue = obj["Date"];
        if (dateValue.getFullYear() < 1900){
            return "";
        }
        var val = dateValue.format("yyyy-mm-dd HH:MM");//控制格式
        return val.substr(11, 5);
    }

};


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
//返回 ：  2017-11-02 11:11
function getDateTime(timestamp){
    var now = new Date();
    now.setTime(timestamp);
    var year = now.getFullYear()
    var month=now.getMonth()+1;     
    var date=now.getDate();     
    var hour=now.getHours();     
    var minute=now.getMinutes();  
    
    return year + "-" + toDou(month)+"-"+toDou(date)+" "+" "+toDou(hour)+":"+toDou(minute);
    
}
//返回 ：  2017-11-01
function getDate(timestamp){
    var now = new Date();
    now.setTime(timestamp);
    var year = now.getFullYear()
    var month=now.getMonth()+1;     
    var date=now.getDate();
    
    return year + "-" + toDou(month)+"-"+toDou(date);
}
//时间转时间戳
function timeStamp(time){
    var nowTime = new Date(time);
    var time_stamp = nowTime.getTime()/1000;
    return time_stamp;
}

//补零
function toDou(n){
    return n >= 10 ? '' + n : '0' + n
}


//格式化数字金额
function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

//生成13位随机数 规则：当前时间戳后10位+1个随机字符串+1个随机数+1个随机字符串
function random(){
    var chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var num1 = Math.floor(Math.random()*chars.length);
    var num2 = Math.floor(Math.random()*chars.length);
    var num3 = Math.ceil(Math.random()*9);
    var timestamp = new Date().getTime().toString().substr(3);
    var str = timestamp + chars[num1] + num3 + chars[num2];
    return str;
}

//通过随机数强制刷新页面（解决微信安卓版reload失效问题）
var reload = function(){
    var hash = +(new Date());
    var new_search = (/wechat_hash/).test(location.search) ?
        // 如果之前有添加过指纹，就更新它
        location.search.replace(/wechat_hash=\d+(&?)/,'wechat_hash=' + hash + '$1') :
        location.search == "" ?
            // 如果 search 为空
        '?wechat_hash=' + hash :
            // 如果 search 不为空
        location.search + '&wechat_hash=' + hash;
    // 修改浏览器历史
    var current_title = document.title;
    var new_uri = location.origin + location.pathname + new_search;
    history.replaceState(null, current_title, new_uri);
    // 重新加载页面
    location.reload(true);
};

function getCookie(c_name){
	if (document.cookie.length>0){
	  c_start=document.cookie.indexOf(c_name + "=")
	  if (c_start!=-1){ 
	    c_start=c_start + c_name.length+1 
	    c_end=document.cookie.indexOf(";",c_start)
	    if (c_end==-1) c_end=document.cookie.length
	    	return unescape(document.cookie.substring(c_start,c_end))
	    } 
	}
	return ""
}

function setCookie(name,value,expireHours){
    var cookieString=name+"="+value+"; path=/";
    //判断是否设置过期时间
    if(expireHours>0){
        var date=new Date();
        date.setTime(date.getTime+expireHours*3600*1000);
        cookieString=cookieString+"; expire="+date.toGMTString();
    }
    document.cookie=cookieString;
}

function checkCookie( val ){
	username=getCookie(val);
	if (username ==null ||username ==""){
		return false;
	}else{
		return true;
    }
 }

//删除cookie
function deleteCookie(name){ 
    var date=new Date(); 
    date.setTime(date.getTime()-10000); 
    document.cookie=name+"=v; expires="+date.toGMTString(); 
}

//json2url
function json2url(json){
	var arr=[];
	for(var i in json){
		arr.push(i+'='+json[i]);
	}
	return arr.join('&')
}
//json2url({a: 12, b: 5})->'a=12&b=5'
//json2url({a: 12, b: 5});

//获取查询字符串  GetQueryString('id')
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}



//自定义ajax
function request (option, callback){
    var type = option.type || 'POST';
    var url = option.url || '';
    var data = option.data || {};
    var dataType = option.dataType || 'json';
    
    var token = getCookie('token');
    if( ! token) {
        toast('登录信息已过期，请重新登录！').then(function(){
            location.href = 'login.html';    
        });
    }
    $.ajax({
        //请求类型，这里为POST
        type: type,
        //你要请求的api的URL
        url: url ,
        //是否使用缓存
        cache: false,
        //数据类型，这里我用的是json
        dataType: dataType,
        data: data,
        //添加额外的请求头
        headers : {'token': token},
        //请求成功的回调函数
        success: function(data){
            //函数参数 "data" 为请求成功服务端返回的数据
            callback && callback(data);
        },
        error: function(data){
            callback && callback(data);
        }
    })
}



//删除数据
//data.removeData(index);
//删除数组中指定下标的某一项
Array.prototype.removeData = function (obj){ 
    for(var i = 0;i < this.length; i ++){ 
        var temp = this[i]; 
        if( ! isNaN(obj)){ 
            temp = i; 
        } 
        if(temp == obj){ 
            for(var j = i; j < this.length; j++){
                this[j]=this[j + 1]; 
            } 
            this.length = this.length - 1; 
        } 
    } 
}
