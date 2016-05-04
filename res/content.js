function $_id(id) {
    return document.getElementById(id);
}

function getMaskContainer(name, phone) {
    var alert_div = $_id("pthospital_chrome_plugin");
    if (!alert_div) {
        alert_div = document.createElement("div");
        alert_div.id = "pthospital_chrome_plugin";
        alert_div.innerHTML = "《" + name + "》属于莆田系医疗机构，就医请谨慎！";
        alert_div.style.display = "block";
        alert_div.style["background-color"] = "red";
        alert_div.style.width = "100%";
        alert_div.style.height = "50px";
        alert_div.style["font-family"] = "'Source Sans Pro', 'Microsoft Yahei',sans-serif,Arial";
        alert_div.style["font-size"] = "30px";
        alert_div.style.color = "black";
        alert_div.style.position = "fixed"
        alert_div.style.bottom = "0";
        alert_div.style["z-index"] = "99999";
        alert_div.style["line-height"] = "50px;";
        document.body.appendChild(alert_div);
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