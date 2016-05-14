var frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
    window.setTimeout(func, 1000 / 30);
};

function showDanger(dom) {
  if (dom.querySelector(".pt-chrome-plugin")) {
    return;
  }
  var html = "<a style='background-color:red; padding:3px 6px; margin-left:5px;' href='https://github.com/hustcc/PTHospital.chrome' target='_blank' class='pt-chrome-plugin OP_LOG_LINK c-text c-text-public c-text-mult c-gap-icon-left'>莆田系</a>";
  var title = dom.querySelector(".t");
  if (title) {
    title.innerHTML = title.innerHTML + html;
  }
}

var search_results = [];

function msgCallback(response) {
  if (response.data && response.data.length >= 2) {
    showDanger(search_results[response.id]);    
  }
}

function doBaidu() {
  search_results = document.getElementsByClassName("c-container") || [];
  for (var i = 0; i < search_results.length; i++) {
    var result = search_results[i];
    if (result.querySelector(".pt-chrome-plugin")) {
      continue;
    }
    var url = result.querySelector(".c-showurl");
    if (url) {
      url = url.innerText;
      url = url.substring(0, url.indexOf("/"));
      // title = title.innerText;
      chrome.runtime.sendMessage({
        "id": i,
        "what": "ptinfo_bs", 
        "url": url,
        "title": "",
        "desc": ""}, msgCallback);
    }
  }
  frame_func(doBaidu);
}
doBaidu();
