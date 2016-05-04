function getDomainFromUrl(url) {
	var host = "null";
	if(typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match)
		host = match[1];
	return host;
}

function checkForPTUrl(tabId, changeInfo, tab) {
	var PT_url = getDomainFromUrl(tab.url).toLowerCase();
	var PTINFO = PTHospitalList[PT_url];
	if(PTINFO) {
		// 显示图标
		chrome.pageAction.show(tabId);
		// 修改提示文字
	}
};

chrome.tabs.onUpdated.addListener(checkForPTUrl);