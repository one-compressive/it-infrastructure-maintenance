function func(arr1, arr2) {
    arr1.sort()
    arr2.sort()
    if (arr1.length == arr2.length && arr1.every((val, ind) => val === arr2[ind])) {
        return true
    } else {
        return false
    }
}

console.log(func([1, 2, 3, 8, -2], [2, 3, 8, 1, -2]))
