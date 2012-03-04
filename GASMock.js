//require MotorCycle/json2.js
if (typeof(Logger)=="undefined") {
var GASIsMocked = true;

var Logger = {
        log: function (a) {
                //a = getCallerLine("") + " - " + a;
                console.log(a);
                //document.write(a+"<br />\n");
        }
}
//
//function getCallerLine(moduleName, cCons) {
//    // Make an error to get the line number
//    var e = new Error()
//    //    in case of custum console, the stack trace is one item longer
//    var splitNum = 1
//    var line = e.stack.split('\n')[splitNum]
//    var parts = line.split('/')
//    var last_part = parts[parts.length -1]
//    var file_name = last_part.substring(0,last_part.length-1)
//    if (moduleName)
//        return moduleName + ' ('+file_name+')'
//    return e.stack;
//}

var Utilities = {
        jsonStringify: JSON.stringify,
        jsonParse: JSON.parse
}

var CalendarApp = {
        getCalendarById: function () {
                return MockCalendar;
        },
        getAllOwnedCalendars: function () {
                return [MockCalendar];
        }
}

var MockCalendar = {
        events: [],
        getId: function () {
                return "MockCalendar";
        },
        getEvents: function (startTime, endTime) {
                return this.events;
        },
        createAllDayEvent: function (title, date) {
                var event = new MockCalendarEvent({title: title, allDayDate: date});
                this.events.push(event);
                
                return event;
        },
        createEvent: function (title, startTime, endTime) {
                var event = new MockCalendarEvent({title: title, startTime: startTime, endTime: endTime, isAllDayEvent: false});
                this.events.push(event);
                
                return event;
        },
        deleteEvent: function (event) {
                this.events.splice(this.events.indexOf(event), 1);
        }
}

var MockCalendarEvent = function (data) {
        var that = {};
        that.data = data;
        that.data.tags = that.data.tags ? that.data.tags : {};
        that.data.id = "event"+Math.round(Math.random()*10000);
        that.data.isAllDayEvent = that.data.isAllDayEvent==undefined ? true : that.data.isAllDayEvent;
        that.getId = function () {
                return this.data.id
        };
        that.getTag = function (name) {
                return this.data.tags.name;
        };
        that.setTag =    function (name, value) {
                this.data.tags.name = value;
        };
        that.getTitle = function () {
                return this.data.title;
        };
        that.setTitle = function (title) {
                this.data.title = title;
        };
        that.getStartTime = function () {
                return this.data.isAllDayEvent ? this.data.allDayDate : this.data.startTime;
        };
        that.getEndTime = function () {
                return this.data.isAllDayEvent ? this.data.allDayDate : this.data.endTime;
        };
        that.isAllDayEvent = function () {
                return this.data.isAllDayEvent;
        };
        that.setTime = function (startTime, endTime) {
                this.data.startTime = startTime;
                this.data.endTime = endTime;
                this.data.isAllDayEvent = false;
        };
        that.setAllDayDate = function (date) {
                this.data.allDayDate = date;
        };
        that.deleteEvent = function () {
                MockCalendar.deleteEvent(this);
        };
        return that;
};
}