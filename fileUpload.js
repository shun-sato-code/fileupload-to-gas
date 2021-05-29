function uploadJSON(){
	let question = Browser.msgBox('アップロードを開始しますか',Browser.Buttons.OK_CANCEL);

	if (question == "ok") {
		//シート生成
		let sheetName = Browser.inputBox('シート名を入力してください');
		let curSheet.insertSheet(sheetName);

		//ファイル指定
		let fileID = Browser.inputBox('ファイルのIDを入力してください');
		Browser.msgBox(`「${fileID}」をアップロードします`);

		if (sheetName == 'cancel') {
			Browser.msgBox('終了します');
		} else {
			//OKなら読み込む
			getObj(fileID);
		}
	} else {
		Browser.msgBox('終了します');
	}
}

function getObj(id){
	letv file = DriveApp.getFileById(id);
	let blob = file.getBlob();
	let data = blob.getDataAsString();
	let jsonObj = JSON.parse(data);
	Logger.log(jsonObj.hits.total);

	let dataCount = jsonObj.hits.total;

	let dataArr = [];
	dataArr.push(['req_create_date','content']);

	for (let i = 0; i < dataCount; i++) {
		let req_create_date = jsonObj.hits.hits[i]._source.req_create_date;
		let content = jsonObj.hits.hits[i]._source.content;
		dataArr.push([req_create_date,content]);

		Logger.log(`${i+1}件目`);
		Logger.log(req_create_date);
		Logger.Log(content);
	}

	sheet = SpreadsheetApp.getActiveSheet();
	row = dataArr.length;
	col = dataArr[0].length;
	sheet.getRange(1,1,row,col).setValues(dataArr);
}

