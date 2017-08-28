/**
 * name js-tools
 * author jd
 * create date 2016-08-13
 */


//查询url字符串参数
function getQueryStringArgs() {

    // 取得查询字符串并去掉开头的问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : "");
    // 保存数据的对象
    args = {};
    //  取得每一项
    items = qs.length ? qs.split("&") : [];
    item = null;
    name = null;
    value = null;

    i = 0;
    len = items.length;
    // 将每一项添加到args中
    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

//向URL的末尾添加查询字符串参数
function addURLParam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

//动态引入js文件
function loadScript(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "url";
    document.documentElement.childNodes[0].appendChild(script); //在header 中添加引入js脚本
    document.body.appendChild(script); //在body中添加js脚本
}

//动态引入css文件
function loadStyles(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var header = document.getElementsByTagName("head").item(0);
    header.appendChild(link);
}


//获取微信浏览器标识
function getWeiXinBrowrsCode() {

    if (window.navigator.userAgent.indexOf("MicroMessenger") != -1) {
        return true;
    } else {
        return false;
    }
}


//获取支付宝浏览器标识
function getZhiFuBaoBrowsCode() {
    if (window.navigator.userAgent.indexOf("AlipayClient") != -1) {
        return true;
    } else {
        return false;
    }
}


//移动端一些适配
function meta() {

    var meta1 = document.createElement("meta");
    meta1.name = "viewport";
    meta1.content = "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,target-densitydpi=device-dpi";


    //忽略将数字变为电话号码，忽略email格式    
    var meta2 = document.createElement("meta");
    meta2.name = "format-detection";
    meta2.content = "telephone=no,email=no,adress=no";

    //IOS中Safari允许全屏浏览：
    var meta3 = document.createElement("meta");
    meta3.name = "apple-mobile-web-app-capable";
    meta3.content = "yes";

    //IOS中Safari顶端状态条样式：
    var meta4 = document.createElement("meta");
    meta4.name = "apple-mobile-web-app-status-bar-style";
    meta4.content = "black";

    var header = document.documentElement.childNodes[0];
    header.appendChild(meta1);
    header.appendChild(meta2);

}


//跨浏览器事件处理程序
var EventUtil = {

    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attacchEvent) {
            element.attacchEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler)
        } else {
            element["on" + type] = null;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};


//创建跨浏览器的XHR对象
function createXHR(argument) {

    if (typeof XMLHttpRequest != "undefined") {

        return new XMLHttpRequest();

    } else if (typeof ActiveXObject != "undefined") {

        //兼容IE7及更早的版本
        if (typeof arguments.callee.activeXStrint != 'string') {

            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                li, len;

            for (i = 0, len = versions.length; i < len; i++) {

                try {

                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXStrint = versions[i];
                    break;

                } catch (ext) {

                }
            }
        }

        return new ActiveXObject(arguments.callee.activeXStrint);
    } else {
        throw new Error("No XHR object available.");
    }
}


function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

/**
 * 生成随机字符串
 * @param len
 * @returns {string}
 */
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//获得cookie函数
function getCookie($name) {
    var data = document.cookie;
    var dataArray = data.split("; ");
    for (var i = 0; i < dataArray.length; i++) {
        var varName = dataArray[i].split("=");
        if (varName[0] == $name) {
            return decodeURI(varName[1]);
        }

    }
}

//删除cookie中所有定变量函数
function delAllCookie() {
    var myDate = new Date();
    myDate.setTime(-1000);//设置时间
    var data = document.cookie;
    var dataArray = data.split("; ");
    for (var i = 0; i < dataArray.length; i++) {
        var varName = dataArray[i].split("=");
        document.cookie = varName[0] + "=''; expires=" + myDate.toGMTString();
    }

}

//向服务器端写入javascript日记 通过get方式
function logError(url, sev, msg) {
    var img = new Image();
    img.src = url + "?sev=" + encodeURIComponent(sev) + "&msg=" + encodeURIComponent(msg);
}


/**
 * 滚动到页面顶部插件
 * @param elemt 触发滚动的元素
 */
function goToTop(elemt) {
    var topbtn = document.getElementById(elemt);
    var timer = null;
    var pagelookheight = document.documentElement.clientHeight; //获取屏幕的高度

    window.onscroll = function () {
        var backtop = document.body.scrollTop; //获取滚动的高度
        if (backtop >= pagelookheight) {
            topbtn.style.display = "block";
        } else {
            topbtn.style.display = "none";
        }
    };

    topbtn.onclick = function () {
        timer = setInterval(function () {
            var backtop = document.body.scrollTop; //获取滚动的高度
            var speedtop = backtop / 5;//计算每次滚动的距离
            document.body.scrollTop = backtop - speedtop;
            if (backtop == 0) {
                clearInterval(timer);
            }
        }, 30);
    }
}


//第一步：创建一个XMLHttpRequest对象，如果浏览器不支持，则创建 ActiveXObject
var xmlHttp;

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
}

function doGet(url) {
    createxmlHttpRequest();
    xmlHttp.open("GET", url);    //第二步，打开连接
    xmlHttp.send(null);         //第三步，发送数据（请求体或查询参数）
    //第四步，监听响应变化
    xmlHttp.onreadystatechange = function () {
        if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
            /*readyState的状态
                0：未初始化，尚未调用open（）方法
                1：启动，已经调用open（），但未调用send（）
                2：发送，已经调用send（），但尚未接收到响应
                3：接收，已经接收到部分响应
                4：完成，已经接收到所有响应数据
            */
            //第五步，处理数据
            console.log(xmlHttp.response);
            // res.innerHTML=xmlHttp.response;
        }
        else {
            console.log('fail');
            console.log(xmlHttp.readyState);
        }
    }
}

function doPost(url, data) {
    createxmlHttpRequest();
    xmlHttp.open("POST", url);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(data);
    xmlHttp.onreadystatechange = function () {
        if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
            console.log(xmlHttp.response);
            // res.innerHTML=xmlHttp.response;
        }
        else {
            console.log('fail');
            console.log(xmlHttp.readyState);
        }
    }
}


//js 格式化日期
function formatDateTime(timeStamp) {

    var date = new Date();
    date.setTime(timeStamp * 1000);
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
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
