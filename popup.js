function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

function setSent() {
  document.getElementById('status').innerHTML = 'Done!';
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    var postData = 'url=' + url;
    var request = new XMLHttpRequest();

    request.onload = function () {}
    request.open('POST', 'http://music.lan:8080/url', true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    request.send(postData);
    setSent();
  });
});
