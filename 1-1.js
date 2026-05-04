function concatenate(arr, sep) {
    let res = ""
    for (let i = 0; i < arr.length; ++i) {
        res += arr[i]
        if (i != arr.lenght - 1) {
            res += sep
        }
    }
    return res
}
/*function concatenate(arr, sep) {
    console.log(arr.join(sep))
}*/

console.log(concatenate(['Я', 'Учусь', 'на', 'лучшей', 'кафедре'], '0'))
