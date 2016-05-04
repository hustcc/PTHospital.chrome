document.addEventListener('DOMContentLoaded', function () {
    function $_id(id) {
        return document.getElementById(id);
    }
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

	function checkForPTUrl(url) {
		var PT_url = getDomainFromUrl(url).toLowerCase();
		return PTHospitalList[PT_url];
	};
    chrome.tabs.getSelected(null, function(tab) {
    	var PTINFO = checkForPTUrl(tab.url);
    	if(PTINFO && PTINFO.length == 2){
			document.getElementById("content-name").innerHTML = PTINFO[0];
			document.getElementById("content-call").innerHTML = PTINFO[1];
		}else{
			document.getElementById("content-name").innerHTML = "...";
			document.getElementById("content-call").innerHTML = "...";
		}
    });
	
});
