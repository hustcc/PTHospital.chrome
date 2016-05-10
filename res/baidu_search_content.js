function showDanger(dom) {
  var html = '<a style="background-color:red; padding:3px 6px; margin-left:5px;" href="https://github.com/hustcc/PTHospital.chrome" target="_blank" class="pt-chrome-plugin OP_LOG_LINK c-text c-text-public c-text-mult c-gap-icon-left">莆田系</a>';
  var title = dom.querySelector(".t");
  if (title) {
    title.innerHTML = title.innerHTML + html;
  }
}

function doBaidu() {
  var search_results = document.getElementsByClassName("c-container") || [];
  for (var i = 0; i < search_results.length; i++) {
    var result = search_results[i];
    if (result.querySelector(".pt-chrome-plugin")) {
      continue;
    }
    var url = result.querySelector(".c-showurl");
    if (url) {
      url = url.innerText;
      url = url.substring(0, url.indexOf("/"));
      chrome.runtime.sendMessage({
        "id": i,
        "what": "ptinfo_bs", 
        "url": url}, function(response) {
          if (response.data && response.data.length >= 2) {
              showDanger(search_results[response.id]);    
          }
      });
    }
  }
  clearTimeout(timer);
  timer = setTimeout(doBaidu, 30);
}
var timer = null;
doBaidu();
