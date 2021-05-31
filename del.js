function DeleteSheets() {
dsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getActiveSheet();
  let sheets = ['シート1'];
  let sheetcount = spreadsheet.getNumSheets();

  for(let i = sheetcount; i > 1; i--){
    let flag = true;
    for (let k=0; k<sheets.length; k++)
      if (sh.getName() == sheets[k]){
        flag = false;
        break;
      }
    }

    if (flag == true){
      spreadsheet.deleteSheet(sh);
    }
}