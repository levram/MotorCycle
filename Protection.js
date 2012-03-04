/*********************************************************************************************
 *** Protection: Cellák módosításának védelme
 *********************************************************************************************/

// TODO: egyelőre az irányítom-ba move-olom
// TODO LOWPRI itt legyen konfigolható, többnyelvűsítés

function testProtectColumns() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var row = sheet.getActiveRange().getRow();
    var col = sheet.getActiveRange().getColumn();
    protectColumns(sheet, row, col);
}

var protectColumns = function (sheet, row, col) {
    if (GlobalConfig.protectedColumns.indexOf(col)!=-1 && !Context.isHeaderRow(sheet, row)) {
        //var cell = sheet.getRange(row, col);
        //cell.setValue("Állítsd vissza az előző értékre! (Nyomj 3 visszavonást)");
        //cell.setBackground("red");
        sheet.getParent().toast(
            "A Műhely helyes működése érdekében ne módosítsd a B, C oszlop tartalmát. Kérlek, vond vissza az utolsó módosítást!",
            "Nem módosítandó mező!", -1);
    }
}

editHandlers.unshift(protectColumns);
