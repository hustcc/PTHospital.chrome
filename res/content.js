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

function getRandomDOM() {
    var divs = document.body.childNodes;
    if (divs.length == 0) {
        return document.body;
    }
    else {
        return divs[getRandomNum(0, divs.length)];
    }
}

function getMaskContainer(name, phone) {
    var divid = generateMixed(getRandomNum(10, 16));
    var alert_div = $_id(divid);
    if (!alert_div) {
        alert_div = document.createElement("div");
        alert_div.id = divid;
        alert_div.innerHTML = "《" + name + "》" + chrome.i18n.getMessage("tipText");
        var cssText = "display:block!important;" +
                      "background-color:red!important;" +
                      "width:" + window.screen.availWidth + "px!important;" +
                      "height:50px!important;" + 
                      "font-family:'Source Sans Pro', 'Microsoft Yahei',sans-serif,Arial!important;" + 
                      "font-size:30px!important;" + 
                      "color:black!important;" + 
                      "position:fixed!important;" + 
                      "left:0!important;bottom:0!important;" + 
                      "z-index:2147483647!important;" + 
                      "line-height:50px!important;"
        alert_div.style.cssText = cssText;
        var divdom = getRandomDOM();
        if (document.body == divdom) {
            document.body.appendChild(alert_div);
        }
        else {
            document.body.insertBefore(alert_div, divdom);   
        }
    }
    return alert_div;
}


function showAlert(name, phone) {
    getMaskContainer(name, phone);
}

chrome.runtime.onMessage.addListener(function(msg) {
    // 检测为pt网址，加入红色背景提示信息
    showAlert(msg.name, msg.phone);
});
