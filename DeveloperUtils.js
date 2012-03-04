if (typeof(Logger)=="undefined") {
    var Logger = {
        log: function (a) {
            console.log(a);
        }
    }
}

var jsUnity;
var jsUnityInit = function () {
    Logger.log("jsUnityInit");
    if (!jsUnity) {
        Logger.log("Fetching jsunity");
        var url = "http://jsunity.googlecode.com/files/jsunity-0.6.js";
        var ret = UrlFetchApp.fetch(url);
        eval(ret.getContentText());
    }
    jsUnity.log = Logger.log;
    jsUnity.attachAssertions();
};

var runTest = function(testSuite, testCaseName) {
    if (testCaseName) {
        for (var i in testSuite) {
            if (i.match(/^test.+/) && i != testCaseName && testSuite[i].constructor == Function) {
                delete testSuite[i];
            }
        }
    }
    jsUnity.run(testSuite);
}


/**
Logger & Profiler

Functions to track execution time
Usage example to log the execution time of a method
<code>
    Log.b("mymethod");
    method();
    Log.e("mymethod");
</code>
*/
var Log = {
    logLevels: {debug: 0, info: 1, warn: 2, error: 3, fatal: 4},
    logLevelNames: ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"],
    get logLevel () {
        if (!this._logLevel) {
            this._logLevel = this.logLevels.debug;
        }
        return this._logLevel;
    },
    setLogLevel: function (level) {
        this._logLevel = level;
    },
    log: function (msg, level) {
        if (this.logLevel<=level) {
            Logger.log("["+this.logLevelNames[level] + "] " + msg);
        }
    },
    debug: function (msg) {
        this.log(msg, this.logLevels.debug);
    },
    info: function (msg) {
        this.log(msg, this.logLevels.info);
    },
    warn: function (msg) {
        this.log(msg, this.logLevels.warn);
    },
    error: function (msg) {
        this.log(msg, this.logLevels.error);
    },
    fatal: function (msg) {
        this.log(msg, this.logLevels.fatal);
    },
    toast: function (msg) {
        this.debug(msg);
        SpreadsheetApp.getActiveSpreadsheet().toast(msg);
    },
    timeDiff: {},
    timeSum: {},
    dt: function (name, msg, isBegin) {
        var now = (new Date()).getTime();
        prev = this.timeDiff[name] ? this.timeDiff[name] : now;
        this.timeDiff[name] = now;
        diff = now-prev;
        if (!this.timeSum[name]) {
            this.timeSum[name] = 0;
        }
        if (!isBegin) {
            this.timeSum[name]+= diff;
        }
        if (isBegin) {
            Logger.log("[P] " + name);
        }
        else {
            Logger.log("[P] " + name + ":             d=" + diff + " ms     S=" + (this.timeSum[name]) + " ms    " + (msg ? ("    - " + msg) : ""));
        }
    },
    b: function (name, msg) {
        this.dt(name, msg, true);
    },
    e: function (name, msg) {
        this.dt(name, msg, false);
    },
    sendMailIfFailed: function (to, subject) {
        var log = Logger.getLog();
        subject += " " + new Date().toUTCString();
        // TODO exception-re is szűrök?
        if (log.replace(/ 0 tests failed/g, '').match(/failed|error/i)) {
            log = log.replace(/ 0 tests failed/g, '');
            var cnt = 0;
            while (log.length) {
                    pos = log.indexOf("\n", 19000);
                    pos = pos===-1 ? log.length : pos;
                    logChunk = log.substring(0, pos);
                    log = log.substring(pos+1);
                    Log.info("e-mail sent: " + subject + (cnt ? " #"+cnt : ""));
                    if (cnt) {
                        // use sleep to preserve emails order
                        Utilities.sleep(1000);
                    }
                    MailApp.sendEmail(to, subject, (cnt ? " #" + cnt + "\n\n" : "") + logChunk);
                    ++cnt;
            }
        }
    }
}






