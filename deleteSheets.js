function deleteALLSheets() {
  const notDelSheet = ["シート1"];
  let mySheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheetData = mySheet.getSheets();
  let flag =0;

  for(i=0;i<sheetData.length;i++){
    if(flag ==0 && i == sheetData.length-1){
      break;
    }
    if(notDelSheet.indexOf(sheetData[i].getSheetName()) != -1){
      flag = 1;
    }
    else{
      mySheet.deleteSheet(sheetData[i]);
    }
  }
}