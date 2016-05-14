document.addEventListener("DOMContentLoaded", function () {
	function $_id(id) {
		return document.getElementById(id);
	}
    chrome.tabs.getSelected(null, function(tab) {
    	$_id("message").innerHTML = chrome.i18n.getMessage("HosInfoTitle");
    	$_id("hospital_name").innerHTML = chrome.i18n.getMessage("HosName");
    	$_id("hospital_call").innerHTML = chrome.i18n.getMessage("HosPhone");
    	$_id("supply_hospital").innerHTML = chrome.i18n.getMessage("fillHosInfo") + "<a target='_blank' href='https://github.com/hustcc/PTHospital.chrome'>PTHospital.chrome@ GitHub</a>";

    	var bg = chrome.extension.getBackgroundPage();
    	var PTINFO = bg.PTINFO["t-" + tab.id];
    	if(PTINFO && PTINFO.length >= 2){
			document.getElementById("content-name").innerHTML = PTINFO[0];
			document.getElementById("content-call").innerHTML = PTINFO[1];
		}else{
			document.getElementById("content-name").innerHTML = "...";
			document.getElementById("content-call").innerHTML = "...";
		}
    });
});
