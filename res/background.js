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


function checkForPTUrl(tabId, changeInfo, tab) {
	console.log(tab.status);
	// if (tab.status === 'complete') {
		var PT_url = getDomainFromUrl(tab.url).toLowerCase();
		var PTINFO = PTHospitalList[PT_url];
		if(PTINFO) {
			// 显示图标
			chrome.pageAction.show(tabId);
			// 发送消息
			chrome.tabs.sendMessage(tabId, {
       			name: PTINFO[0],
        		phone: PTINFO[1]
    		});
			
		}
	// }
};

chrome.tabs.onUpdated.addListener(checkForPTUrl);