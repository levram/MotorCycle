//require MotorCycle/DateHelper.js
DateHelper.userTimezoneOffset = -60;
var DateHelperTestSuite = {
    suiteName: "DateHelperTestSuite",
    /*toGMTDate: function (year, month, day, hour, min, sec) {
        hour = hour || 0;
        min = min || 0;
        sec = sec || 0;
        day = day<10 ? "0"+day : day;
        hour = hour<10 ? "0"+hour : hour;
        min = min<10 ? "0"+min : min;
        sec = sec<10 ? "0"+sec : sec;
        string = typeof(SpreadsheetApp)=="undefined" ?
            month + " " + day + " " + hour + ":" + min + ":" + sec + " GMT " + year:
            month + " " + day + " " + hour + ":" + min + ":" + sec + " GMT " + year;
        return new Date(string);
    },*/
    testDateCeil: function () {
        var tests = [
                                 [new Date("Dec 24 01:00:00 GMT 2011"), new Date("Dec 24 23:00:00 GMT 2011")],
                                 [new Date("Dec 24 02:00:00 GMT 2011"), new Date("Dec 24 23:00:00 GMT 2011")],
                                 [new Date("Dec 25 22:30:00 GMT 2011"), new Date("Dec 25 23:00:00 GMT 2011")],
                                 [new Date("Dec 25 23:00:00 GMT 2011"), new Date("Dec 26 23:00:00 GMT 2011")],
                                 [new Date("Dec 25 23:30:00 GMT 2011"), new Date("Dec 26 23:00:00 GMT 2011")],
                                 ["Jan 07 GMT 2012", new Date("Jan 7 23:00:00 GMT 2012")]
                                 ];
        for (var i in tests) {
            //Logger.log(tests[i]);
            assertNotEqual(tests[i][1].toString(), "invalid date");
            assertTrue(tests[i][1].getFullYear()>1980, tests[i][1].getYear());
            assertEqual(DateHelper.getDateCeil(tests[i][0]).toString(), tests[i][1].toString(), i);
        }
    },
    testDateFloor: function () {
        var tests = [
                                 [new Date("Dec 25 04:00:00 GMT 2011"), new Date("Dec 24 23:00:00 GMT 2011")],
                                 [new Date("Dec 25 02:00:00 GMT 2011"), new Date("Dec 24 23:00:00 GMT 2011")],
                                 [new Date("Dec 26 01:00:00 GMT 2011"), new Date("Dec 25 23:00:00 GMT 2011")],
                                 [new Date("Dec 26 23:00:00 GMT 2011"), new Date("Dec 25 23:00:00 GMT 2011")],
                                 [new Date("Dec 26 23:30:00 GMT 2011"), new Date("Dec 26 23:00:00 GMT 2011")],
                                 ["Jan 07 GMT 2012", new Date("Jan 6 23:00:00 GMT 2012")]
                                 ];
        for (var i in tests) {
            assertNotEqual(tests[i][1].toString(), "invalid date");
            assertTrue(tests[i][1].getFullYear()>1980, tests[i][1].getYear());
            assertEqual(DateHelper.getDateFloor(tests[i][0]).toString(), tests[i][1].toString(), i);
        }
    }
}
