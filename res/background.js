var PTINFO = {}; // 当前的医院信息，针对于不同的tab
var PTHospitalListTemp = null; //医院信息列表

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
				PTHospitalListTemp = PTHospitalList;
			}
		});
	}
};
// 预先拉取数据
load_list_data();

// chrome.tabs.onUpdated.addListener(checkForPTUrl);

function checkPT(hostname, title, desc, tabId) {
	hostname = hostname.toLowerCase();
	var tmp = PTHospitalListTemp[hostname];
	if(tmp) {
		// 显示图标
		chrome.pageAction.show(tabId);
		return tmp;
	}
	else {
		// 网址匹配不到，匹配title
		for (var website in PTHospitalListTemp) {
			tmp = PTHospitalListTemp[website];
			// 匹配title和表述信息
			if (title.indexOf(tmp[0]) !== -1 || desc.indexOf(tmp[0]) !== -1) {
				//匹配到
				chrome.pageAction.show(tabId);
				return tmp;
			}
		}
	}
	return []
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.what == 'ptinfo') {
		var tabId = sender.tab.id;
		var data = checkPT(request.url, request.title, request.desc, tabId);
		if (data.length !== 0) {
			PTINFO["t-" + tabId] = data;	
		}
		sendResponse(data);
	}
});