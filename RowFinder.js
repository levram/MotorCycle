var RowFinder = {
    /**
     * Find matching rows in a 2-dimensional array
     *
     * values: 2-dimensional array
     * conditions: array, containing {key: 1, value: "value"} hashes
     *   a hash represents a condition, checking wether a rows value under in a given key equals (===) the condition's value
     *   a row must match all of these conditions (AND relation)
     *
     * returns: first matching row, or -1 for no result
     */
    findRow: function (values, conditions) {
        return this.findRowHelper(values, conditions, false);
    },
    findAllRows: function (values, conditions) {
        return this.findRowHelper(values, conditions, true);
    },
    findRowHelper: function (values, conditions, all) {
        var res = [];
        for (var valueRow in values) {
            var matches = true;
            for (var i in conditions) {
                var condition = conditions[i];
                var conditionArray = condition.value.constructor == Array ? condition.value : [condition.value];
                matches = matches && conditionArray.indexOf(values[valueRow][condition.key]) !== -1;
            }
            if (matches) {
                if (all) {
                    res.push(valueRow);
                } else {
                    return valueRow;
                }
            }
        }
        return all ? res : -1;
    }
}