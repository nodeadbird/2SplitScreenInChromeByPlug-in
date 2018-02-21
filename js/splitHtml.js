//捕获传递过来的url值
//此方法无法正确截取参数中有中文的情况
// function GetQueryString(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) return unescape(r[2]); return null;
// }
//此方法可以适配有中文的情况
function urlSearch(urlName) {
    var urlStr = window.location.href;
    var num = urlStr.indexOf("?");
    urlStr = urlStr.substr(num + 1);
    var arr = urlStr.split("&");
    for (var i = 0; i < arr.length; i++) {
        var num1 = arr[i].indexOf("=");
        if (num1 > 0) {
            var name = arr[i].substring(0, num1);
            var value = decodeURI(arr[i].substr(num1 + 1));
            if (name == urlName) {
                return value;
            }
        }
    }
}

//获取URL中的标题并设置成分屏页的标题
var firstTitle = urlSearch("firstTitle");
var secondTitle = urlSearch("secondTitle");
document.title = firstTitle + "和" + secondTitle + "分屏预览";

//将捕获的值设置给iframe的src
// var url = GetQueryString("tabUrl");
// var firstUrl = GetQueryString("firstUrl");
// var secondUrl = GetQueryString("secondUrl");
//获取URL中的网址链接
var firstUrl = urlSearch("firstUrl");
var secondUrl = urlSearch("secondUrl");
// alert(firstUrl);
// alert(secondUrl);
if (firstUrl != null) {
    $("#leftIframe").attr("src", firstUrl);
    $("#rightIframe").attr("src", secondUrl);
} else {
    //若空白页打开双屏，默认打开百度
    $("#leftIframe").attr("src", "https://www.baidu.com/");
    $("#rightIframe").attr("src", "https://www.baidu.com/");
}
// alert($(window).height());//638
// alert($(window).width());//1366

//根据屏幕分辨率重新定义窗体尺寸，可以适配任何分辨率
var height = $(window).height();
var width = $(window).width();
$("#splitDiv").css("width", width - 17);
$("#splitDiv").css("height", height - 17);

//根据浏览器类型进行适配
var explorer = navigator.userAgent;
//ie
if (explorer.indexOf("MSIE") >= 0) {
    alert("当前使用的浏览器内核为IE浏览器");
    var childWidth = Math.floor(width / 2) - 10;
    $("#three").css("width", childWidth);
    $("#four").css("width", childWidth);
}
//firefox
else if (explorer.indexOf("Firefox") >= 0) {
    alert("Firefox");
}
//Chrome
else if (explorer.indexOf("Chrome") >= 0) {
    //alert("当前使用的浏览器内核为Chrome浏览器");
}
//Opera
else if (explorer.indexOf("Opera") >= 0) {
    alert("Opera");
}
//Safari
else if (explorer.indexOf("Safari") >= 0) {
    alert("Safari");
}
//Netscape
else if (explorer.indexOf("Netscape") >= 0) {
    alert('Netscape');
}
//声明分屏
var split = Split(['#three', '#four'], {
    sizes: [50, 50],
    minSize: 0,
});

// function modelButtonClick() {
//     var firstVal = $("#firstUrl").val();
//     var secondVal = $("#secondUrl").val();
//     if(firstVal != ''){
//         $("#leftIframe").attr("src",firstVal);
//     }
//     if(secondVal != ''){
//         $("#rightIframe").attr("src",secondVal);
//     }
//     document.getElementById("firstUrl").value = "";
//     document.getElementById("secondUrl").value = "";
//     $('#myModal').modal('hide');
// }

//仿手机端touch键效果
$(document).ready(function () {
    var $div = $("div#button");
    /* 绑定鼠标左键按住事件 */
    $div.bind("mousedown", function (event) {
        /* 获取需要拖动节点的坐标 */
        var offset_x = $(this)[0].offsetLeft;//x坐标
        var offset_y = $(this)[0].offsetTop;//y坐标
        /* 获取当前鼠标的坐标 */
        var mouse_x = event.pageX;
        var mouse_y = event.pageY;
        /* 绑定拖动事件 */
        /* 由于拖动时，可能鼠标会移出元素，所以应该使用全局（document）元素 */
        $(document).bind("mousemove", function (ev) {
            /* 计算鼠标移动了的位置 */
            var _x = ev.pageX - mouse_x;
            var _y = ev.pageY - mouse_y;
            /* 设置移动后的元素坐标 */
            var now_x = (offset_x + _x) + "px";
            var now_y = (offset_y + _y) + "px";
            /* 改变目标元素的位置 */
            $div.css({
                top: now_y,
                left: now_x
            });
        });
    });
    /* 当鼠标左键松开，接触事件绑定 */
    $(document).bind("mouseup", function () {
        $(this).unbind("mousemove");
    });
})

//设置网址链接窗口，以model形式显示
$("#buttonClick").click(function () {
    var height = 200;
    var width = 600;
    var title = "请设置网址链接";
    var popWindow = document.getElementById("popWindow");
    var popWindowBg = document.getElementById("popWindowBg");
    popWindow.style.left = (document.body.scrollWidth - width) / 2;
    popWindow.style.top = (document.body.scrollHeight - height) / 2 - 50;
    popWindow.style.width = width;
    popWindow.style.height = height;
    document.getElementById("titleTd").innerHTML = title;
    popWindow.style.display = "block";
    popWindowBg.style.display = "block";
});

//定义关闭按钮
$("#popWindowHide").click(function () {
    // document.getElementById("firstUrl").value = "";
    // document.getElementById("secondUrl").value = "";
    document.getElementById("popWindow").style.display = "none";
    document.getElementById("popWindowBg").style.display = "none";
});

//定义model中的确认提交按钮
$("#submitUrl").click(function () {
    var firstVal = $("#firstUrl").val();
    var secondVal = $("#secondUrl").val();
    if (firstVal != '') {
        $("#leftIframe").attr("src", firstVal);
    }
    if (secondVal != '') {
        $("#rightIframe").attr("src", secondVal);
    }
    document.getElementById("firstUrl").value = "";
    document.getElementById("secondUrl").value = "";
    // $("#leftIframe").attr("src","http://ow365.cn/?i=14001&n=6&furl=http://www.chinaclear.cn/zdjs/editor_file/20141114110738638.pdf");
    // $("#rightIframe").attr("src","http://ow365.cn/?i=14001&n=6&furl=http://www.chinaclear.cn/zdjs/editor_file/20141114110738638.pdf");
    document.getElementById("popWindow").style.display = "none";
    document.getElementById("popWindowBg").style.display = "none";
});