document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.getSelected(null, function(tab) {
    	var bg = chrome.extension.getBackgroundPage();
    	var PTINFO = bg.PTINFO;
    	if(PTINFO && PTINFO.length == 2){
			document.getElementById("content-name").innerHTML = PTINFO[0];
			document.getElementById("content-call").innerHTML = PTINFO[1];
		}else{
			document.getElementById("content-name").innerHTML = "...";
			document.getElementById("content-call").innerHTML = "...";
		}
    });
});
