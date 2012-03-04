var DateHelper = {
    userTimezoneOffset: 0, // GMT
    /**
     * returns the last midnight in users tz
     */
    getDateFloor: function (d) {
        ret = new Date(d);
        if (ret.getUTCHours()+ret.getUTCMinutes()/60+ret.getUTCSeconds()/3600 <= (this.userTimezoneOffset/60+24)%24) {
            ret.setUTCDate(ret.getUTCDate()-1);
        }
        ret.setUTCHours((this.userTimezoneOffset/60+24)%24, 0, 0, 0);
        return ret;
    },
    /**
     * returns the next midnight in users tz
     */
    getDateCeil: function (d) {
        ret = new Date(d);
        if (ret.getUTCHours()+ret.getUTCMinutes()/60+ret.getUTCSeconds()/3600 >= (this.userTimezoneOffset/60+24)%24) {
            ret.setUTCDate(ret.getUTCDate()+1);
        }
        ret.setUTCHours((this.userTimezoneOffset/60+24)%24, 0, 0, 0);
        return ret;
    },
    getDateString: function (d) {
        ret = d.constructor == Date ? d : new Date(d);
        ret = new Date(ret.getTime()-this.userTimezoneOffset*60000);
        ret = ret.getUTCFullYear()+"-"+(ret.getUTCMonth()+1)+"-"+ret.getUTCDate();
        return ret;
    },
    getDate: function (d) {
        ret = d.constructor == Date ? d : new Date(d);
        ret = new Date(ret.getTime()-this.userTimezoneOffset*60000);
        ret = new Date(ret.getUTCFullYear(), ret.getUTCMonth(), ret.getUTCDate());
        return ret;
    },
    getToday: function () {
        var now = new Date();
        var today = now.getFullYear()+"."+(now.getMonth()+1)+"."+now.getDate()+".";
        return today;
    },
    getTomorrow: function () {
        var tomorrow = DateHelper.getTomorrowDate();
        return DateHelper.getDateString(tomorrow);
    },
    /**
     * returns a date object for midnight between today and tomorrow in user's tz
     */
    getTomorrowDate: function () {
        var tomorrow = new Date();
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
        tomorrow.setUTCHours(this.userTimezoneOffset/60);
        tomorrow.setUTCMinutes(0);
        tomorrow.setUTCSeconds(0);
        tomorrow.setUTCMilliseconds(0);
        return tomorrow;
    },
    equals: function (d1, d2) {
        var v1 = d1.constructor == Date ? d1.getTime() : new Date(d1).getTime();
        var v2 = d2.constructor == Date ? d2.getTime() : new Date(d2).getTime();
        return d1===d2 || v1 === v2;
    }
};
