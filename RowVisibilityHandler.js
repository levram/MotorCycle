var RowVisibilityHandler = {
    // there is no way in GAS API to query row visibility. For testing and performance tuning purpose we mark the hidden rows
    markVisibility: true,
    markVisibilityOnCol: 1,
    markVisible: function (range, visible) {
        range.setFontLine(visible ? "" : "line-through");
    },
    isMarkedVisible: function (range) {
        return range.getFontLines().map(function (item) { return item[0] !== "line-through"; });
    },
    getVisibility: function (sheet, row) {
        return this.getVisibilities(sheet, row, row).pop();
    },
    getVisibilities: function (sheet, firstRow, lastRow) {
        if (!this.markVisibility) {
            throw new Error("RowVisibilityHandler.getVisibilities needs RowVisibilityHandler.markVisibility to be true");
        }
        return this.isMarkedVisible(sheet.getRange(firstRow, this.markVisibilityOnCol, lastRow-firstRow+1, 1));
    },
    setVisibility: function (sheet, row, visibility) {
        this.setVisibilities(sheet, row, row, [visibility]);
    },
    setVisibilities: function (sheet, firstRow, lastRow, visibilities) {
        if (this.markVisibility) {
            var rangeRowsIsVisible = this.getVisibilities(sheet, firstRow, lastRow);
            var callFuncs = [];
            for (var i = 0; i < rangeRowsIsVisible.length; i++) {
                var rowIndex = i + firstRow;
                if (rangeRowsIsVisible[i] === false && visibilities[i] === true) {
                    callFuncs[rowIndex] = function (a, b) { RowVisibilityHandler.showRows(sheet, a, b); };
                }
                else if (rangeRowsIsVisible[i] === true && visibilities[i] === false) {
                    callFuncs[rowIndex] = function (a, b) { RowVisibilityHandler.hideRows(sheet, a, b); };
                }
                else {
                    callFuncs[rowIndex] = null;
                }
            }
            this.callBySections2(callFuncs);
        }
        else {
            var rangeRowsToShow = [];
            var rangeRowsToHide = [];
            for (var i = 0; i < visibilities.length; i++) {
                var rowIndex = parseInt(i) + firstRow;
                if (visibilities[i]) {
                    rangeRowsToShow.push(rowIndex);
                }
                else {
                    rangeRowsToHide.push(rowIndex);
                }
            }
            if (rangeRowsToShow.length<rangeRowsToHide.length) {
                this.hideRow(sheet, dataRange);
                this.callBySections(rangeRowsToShow, function (a, b) {RowVisibilityHandler.showRows(sheet, a, b);});
            }
            else {
                this.unhideRow(sheet, dataRange);
                this.callBySections(rangeRowsToHide, function (a, b) {RowVisibilityHandler.hideRows(sheet, a, b);});
            }
        }
    },
    // TODO rename
    callBySections2: function (callFuncs) {
        if (!callFuncs.length) {
            return;
        }
        var sectionStart, sectionLength, lastItem;
        for (var rowIndex in callFuncs) {
            var item = callFuncs[rowIndex];
            if (typeof lastItem === "undefined") {
                lastItem = item;
                sectionStart = rowIndex;
                sectionLength = 1;
            }
            else if (item === lastItem) {
                sectionLength++;
            }
            else {
                if (lastItem) {
                    lastItem(sectionStart, sectionLength);
                }
                lastItem = item;
                sectionStart = rowIndex;
                sectionLength = 1;
            }
        }
        if (lastItem) {
            lastItem(sectionStart, sectionLength);
        }  
    },
    callBySections: function (arr, callback) {
        if (!arr.length) {
            return;
        }
        var sectionStart, sectionLength;
        for (var i in arr) {
            var item = arr[i];
            if (i==0) {
                sectionStart = item;
                sectionLength = 1;
            }
            else if (item == sectionStart+sectionLength) {
                sectionLength++;
            }
            else {
                callback(sectionStart, sectionLength);
                sectionStart = item;
                sectionLength = 1;
            }
        }
        callback(sectionStart, sectionLength);
    },
    hideRow: function (sheet, dataRange) {
        sheet.hideRow(dataRange);
        if (this.markVisibility) {
            Log.debug("hideRow " + [0, 1, dataRange.getHeight(), 1]);
            this.markVisible(dataRange.offset(0, this.markVisibilityOnCol-1, dataRange.getHeight(), 1), false);
        }
    },
    unhideRow: function (sheet, dataRange) {
        sheet.unhideRow(dataRange);
        if (this.markVisibility) {
            Log.debug("unhideRow " + [0, 1, dataRange.getHeight(), 1]);
            this.markVisible(dataRange.offset(0, this.markVisibilityOnCol-1, dataRange.getHeight(), 1), true);
        }
    },
    hideRows: function (sheet, row, cnt) {
        sheet.hideRows(row, cnt);
        if (this.markVisibility) {
            Log.debug("hideRows " + [row, 2, cnt, 1]);
            this.markVisible(sheet.getRange(row, this.markVisibilityOnCol, cnt, 1), false);
        }
    },
    showRows: function (sheet, row, cnt) {
        sheet.showRows(row, cnt);
        if (this.markVisibility) {
            Log.debug("showRows " + [row, 2, cnt, 1]);
            this.markVisible(sheet.getRange(row, this.markVisibilityOnCol, cnt, 1), true);
        }
    }
}
