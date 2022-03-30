/**
 * 1.返回结果resolve的结果数组， 确保全部完成，counter变量
 * 2.结果数组按传入的顺序  for let i 块级作用域
 * 3.如果有reject,立即返回第一个错误
 * 
 */
function all(pr) {
    return new Promise((resolve, reject) => {
        let counter = 0;
        let result = []
        function hanlder(value, i) {
            counter++;
            result[i] = value
            if (counter === pr.length) {
                resolve(result)
            }
        }
        for (let i = 0; i < pr.length; i++) {
            let p = pr[i]
            if (p instanceof Promise) {
                p.then(value => hanlder(value, i), reject)
            }
            else {
                hanlder(p, i)
            }
        }
    })
}

(function () {
    var a = new Promise(resolve => setTimeout(() => {
        resolve(1)
    }, 2000))
    var b = new Promise((resolve,reject) => setTimeout(() => {
        reject(2)
    }, 1000))
    all([a, b]).then(v => console.log(v))
})()