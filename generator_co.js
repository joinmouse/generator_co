const fs = require('fs').promises

/*
function* read() {
    let a = yield 1;
    console.log(a)
    let b = yield 2;
    console.log(b)
    let c = yield 3;
    console.log(c)
}

let iterator = read()
console.log(iterator.next())
console.log(iterator.next('aa'))
console.log(iterator.next('bb'))
console.log(iterator.next('cc'))
*/

// 异步的读文件
function* readfn() {
    let content = yield fs.readFile('./file/age.txt', 'utf8')
    let r = yield fs.readFile(content, 'utf8')
    return r
}

// 模拟实现一个co
function co(iterator) {
    let result = new Promise((resolve, reject) => {
        //递归执行next
        function next(data) {
            let { value, done } = iterator.next(data)
            // 判断done是否完成了
            if(!done) {
                // 将value封装成了一个Promise对象
                Promise.resolve(value).then(res => {
                    // res就是就是传入的value
                    next(res)
                }, err => reject(err))
            }else {
                resolve(value)
            }
        }
        next()
    })
    return result
}

co(readfn()).then(res => {
    console.log(res)
}, err => {
    console.log(err)
})