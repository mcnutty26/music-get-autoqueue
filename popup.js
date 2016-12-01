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
};

function setText(text) {
  document.getElementById('status').textContent = text;
}

document.addEventListener('DOMContentLoaded', function() {
	getCurrentTabUrl(function(url) {
		var request = new XMLHttpRequest();
    	var postData = 'url=' + url;
    	request.open('POST', 'http://music.lan/api/url', true);
    	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
		request.onload = function() {
			if (request.status == 200) {
				setText("Done!");	
			} else if (request.status == 503) {
				setText("Server offline!");
			} else {
				setText("Bad request!");
			}
		}
    	request.send(postData);
	})
});
