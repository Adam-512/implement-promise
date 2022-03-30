/**
 * 全部promise都有结果，不管成功或者失败
 */

function allSettled(pr) {
    return new Promise((resolve, reject) => {
        let res = []
        function handler(value, index) {
            res[index] = value
            //attention here
            let _res = res.filter(v=>v!==undefined)
            if (_res.length == pr.length) {
                resolve(res)
            }
        }
        for (let i = 0; i < pr.length; i++) {
            let p = pr[i]
            if (p instanceof Promise) {
                p.then(value => handler(value, i), err => handler(err, i))
            }
            else {
                handler(p, i)
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
    allSettled([a, b]).then(v => console.log(JSON.stringify(v)))
})()