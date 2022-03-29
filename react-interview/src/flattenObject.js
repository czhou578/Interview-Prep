var testObj = {
    a: 3,
    b: {
        c: {
            d: {
                e: 5
            }
        }
    },
    f: {
        g: {
            h: 12
        }
    }
};
function flatten(object) {
    var flattened = {};
    Object.keys(object).forEach(function (key) {
        var value = object[key];
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(flattened, flatten(flattened));
        }
        else {
            flattened[key] = value;
        }
    });
    return flattened;
}
function writeReduce(arr, startIndex) {
    for (var i = startIndex; i < arr.length; i++) {
        arr[i] = arr[i] + 5;
    }
    return arr;
}
console.log(writeReduce([1, 2, 3, 4, 5], 0));
console.log(flatten(testObj));
