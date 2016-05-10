function showDanger(dom) {
  var html = '<a style="background-color:red; padding:3px 6px; margin-left:5px;" href="http://trust.baidu.com/vstar/official/intro?type=gw" target="_blank" class="OP_LOG_LINK c-text c-text-public c-text-mult c-gap-icon-left">莆田系</a>';
  var title = dom.querySelector(".t");
  if (title) {
    title.innerHTML = title.innerHTML + html;
  }
}

var search_results = document.getElementsByClassName("c-container") || [];
for (var i = 0; i < search_results.length; i++) {
  var result = search_results[i];
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
