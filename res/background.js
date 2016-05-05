function getDomainFromUrl(url) {
	var host = "null";
	if(typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match)
		host = match[1];
	return host;
};

var PTINFO;
var PTHospitalListTemp = null;


function checkForPTUrl(tabId, changeInfo, tab) {
	var PT_url = getDomainFromUrl(tab.url).toLowerCase();
	PTINFO = PTHospitalListTemp[PT_url];
	if(PTINFO) {
		// 显示图标
		chrome.pageAction.show(tabId);
		// 发送消息
		chrome.tabs.sendMessage(tabId, {
			name: PTINFO[0],
			phone: PTINFO[1]
		});
		
	}
};

function _readFileContent(link, callback){
    //创建XMLHttpRequest对象，用原生的AJAX方式读取内容
    var xhr = new XMLHttpRequest();
    //处理细节
    xhr.onreadystatechange = function() {
        //后端已经处理完成，并已将请求response回来了
        if (xhr.readyState === 4) {
            var respData;

            //判断status是否为OK
            if (xhr.status === 200 && xhr.responseText) {
                //OK时回送给客户端的内容
                respData = {
                    success : true, //成功
                    content : xhr.responseText  //文件内容
                };
            } else {    //失败
                respData = {
                    success : false,    //失败
                    content : "load remote file content failed." //失败信息
                };
            }
            //触发回调，并将结果回送
            callback(respData);
        }
    };

    //打开读通道
    xhr.open('GET', link, true);

    //设置HTTP-HEADER
    xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
    xhr.setRequestHeader("Access-Control-Allow-Origin","*");

    //开始进行数据读取
    xhr.send();
};

function load_list_data() {
	if (! PTHospitalListTemp) {
		_readFileContent('http://cdn.atool.org/github/PTHospitalList.js', function(content) {
			if (content.success) {
				// 不知道会不会有隐患
				eval(content.content);
				console.log(PTHospitalList);
				PTHospitalListTemp = PTHospitalList;
			}
		});
	}
};
// 预先拉取数据
load_list_data();

chrome.tabs.onUpdated.addListener(checkForPTUrl);