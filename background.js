//拡張機能インストール時にコンテキストメニューを追加
chrome.runtime.onInstalled.addListener(function (details) {
	const menu = chrome.contextMenus.create({
		id: "copyToClipBoard",
		title: "値のみをコピーする",
		contexts: ["selection"],
	});
});

//右クリックメニューからコピー
  chrome.contextMenus.onClicked.addListener((info, tab) =>{
	switch (info.menuItemId) {
		case "copyToClipBoard":
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				function: copyToClipBoard
			});
	}
  });


  //拡張機能アイコンを押してコピー
chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: copyToClipBoard
	});
});


//コピーする処理
function copyToClipBoard() {
	var anyText= window.getSelection().toString();
	var textBox = document.createElement("textarea");
	textBox.setAttribute("id", "target");
	textBox.setAttribute("type", "hidden");
	textBox.textContent = anyText;
	document.body.appendChild(textBox);
  
	textBox.select();
	document.execCommand('copy');
	document.body.removeChild(textBox);
  }