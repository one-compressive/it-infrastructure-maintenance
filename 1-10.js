function erase(arr) {
    for (let i = 0; i < arr.length; ++i) {
        if (typeof (arr[i]) == "undefined" || arr[i] == null || arr[i] == 0 || arr[i] == false || arr[i] == ``) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}

const data = [0, 1, false, 2, undefined, '', 3, null];
console.log(erase(data)) // [1, 2, 3]
