document.addEventListener('DOMContentLoaded', function () {
	var PTINFO = chrome.extension.getBackgroundPage().PTINFO;
	console.log(PTINFO);
	if(PTINFO && PTINFO.length == 2){
		document.getElementById("content-name").innerHTML = PTINFO[0];
		document.getElementById("content-addr").innerHTML = PTINFO[1];
	}else{
		document.getElementById("content-name").innerHTML = "无信息";
		document.getElementById("content-addr").innerHTML = "无信息";
	}
});
