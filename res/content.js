var frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
    window.setTimeout(func, 1000 / 30);
}

String.prototype.sTrim = function () {
    return this.replace(/\s+/g, "");
}

function $_id(id) {
    return document.getElementById(id);
}

var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function generateMixed(n) {
     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}

function getRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

var divid = generateMixed(getRandomNum(10, 16));
var alert_div = null; // div dom
var cssText = null; //div dom的cssText
var cssTextDict = null; // div dom的css Text
var showTipText = ""; // div inner HTML

function cssText2Dict(cssText) {
    var dict = {};
    cssText = cssText.split(";");
    var tmp = null;
    for (var i = cssText.length - 1; i >= 0; i--) {
        tmp = cssText[i].split(":");
        if (tmp[0].sTrim())
          dict[tmp[0].sTrim()] = tmp[1].sTrim();
    };
    return dict;
}

var div_cssDict = null; // 临时变量

function isDivModified(divdom) {
    // 1. css是否被修改
    var div_cssText = divdom.style.cssText;
    div_cssDict = cssText2Dict(div_cssText);
    for (var key in cssTextDict) {
        if (cssTextDict[key] != div_cssDict[key]) {
            return true;
        }
    }
    // 2. innerHTML是否被修改
    if (divdom.innerHTML != showTipText) {
        return true;
    }

    // 3. dom位置修改，父节点不是body
    if (divdom.parentNode != document.body) {
        return true;
    }
    return false;
}

function addMask(divid, name, phone) {
    var alert_div = document.createElement("div");
    alert_div.id = divid;
    showTipText = "『" + name + "』" + chrome.i18n.getMessage("tipText");
    alert_div.innerHTML = showTipText;
    cssText = "display:block!important;" +
                  "opacity:1!important;" +
                  "background-color:red!important;" +
                  "width:" + window.screen.availWidth + "px!important;" +
                  "height:50px!important;" + 
                  "font-family:'Source Sans Pro', 'Microsoft Yahei',sans-serif,Arial!important;" + 
                  "font-size:30px!important;" + 
                  "color:black!important;" + 
                  "position:fixed!important;" + 
                  "left:0px!important;bottom:0px!important;" + 
                  "z-index:2147483647!important;" + 
                  "text-align:center!important;" +
                  "line-height:50px!important;";
    cssTextDict = cssText2Dict(cssText);
    alert_div.style.cssText = cssText;
    // 插入到body最后
    document.body.appendChild(alert_div);
    return alert_div;
}


function getMaskContainer(name, phone) {
    // 如果不存在
    if (!alert_div) {
        alert_div = addMask(divid, name, phone);
    }
    // 提示div被反屏蔽措施修改
    else if (isDivModified(alert_div)) {
        alert_div.parentNode.removeChild(alert_div); //先删除节点
        alert_div = addMask(divid, name, phone);
    }
    // 循环检查防止屏蔽
    frame_func(function() {getMaskContainer(name, phone);});
}

function getDesc() {
    var metas = document.getElementsByTagName('meta');
    for (i in metas) {
      if (metas[i].content && "description" == metas[i].content.toLowerCase()) {
          return metas[i].content;
      }
    }
    return "";
}

document.addEventListener( "DOMContentLoaded", function() {
    chrome.runtime.sendMessage({
      "what": "ptinfo", 
      "url": window.location.hostname, 
      "title": document.title, 
      "desc": getDesc()}, function(response) {
        if (response && response.length >= 2) {
            getMaskContainer(response[0], response[1]);    
        }
    })
}, false );
