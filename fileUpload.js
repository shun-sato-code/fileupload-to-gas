function UploadJSON(){
	let question = Browser.msgBox('アップロードを開始しますか',Browser.Buttons.OK_CANCEL);

	if (question == "ok") {
		//シート生成
		let sheetName = Browser.inputBox('シート名を入力してください');
    let curSheet = SpreadsheetApp.getActiveSpreadsheet();
		curSheet.insertSheet(sheetName);

		//ファイル指定
		let fileUrl = Browser.inputBox('ファイルのURLを入力してください');
		let fileID = fileUrl.slice(32,-17);
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
	let file = DriveApp.getFileById(id);
	let blob = file.getBlob();
	let data = blob.getDataAsString();
  Logger.log(data);
	let jsonObj = JSON.parse(data);
	Logger.log(jsonObj.total);

	let dataCount = jsonObj.total;

	let dataArr = [];
	dataArr.push(['time','content']);

	for (let i = 0; i < dataCount; i++) {
		let content = jsonObj.hits[i].content;
		let originDate = jsonObj.hits[i].time;
		let editedDate = originDate.replace('T',' ').replace('Z','');
		let fixedDate = new Date(editedDate);
		fixedDate.setHours(fixedDate.getHours()+9);


		dataArr.push([fixedDate,content]);

		Logger.log(`${i+1}件目`);
		Logger.log(fixedDate);
		Logger.log(content);
	}

	sheet = SpreadsheetApp.getActiveSheet();
	row = dataArr.length;
	col = dataArr[0].length;

	sheet.getRange(1,1,row,col).setValues(dataArr);
	sheet.getRange('A2:A').setNumberFormat('YYYY-MM-dd HH:00');

	Browser.msgBox('アップロードが完了しました');
}
