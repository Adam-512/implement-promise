/**
 * 只要有promise成功就返回那个promise，如果全部失败，则抛出AggregateError
 */

function any(pr = []) {
    return new Promise((resolve, reject) => {
        let result = []
        let counter = 0
        for (let i = 0; i < pr.length; i++) {
            let p = pr[i]
            if (p instanceof Promise) {
                p.then(resolve, err => {
                    counter++;
                    result[i] = err
                    if (counter === pr.length) {
                        // AggregateError can result multiple error
                        reject(new AggregateError(result, 'No promise fulfilled'))
                         
                    }
                })
            }
        }
    })

}

(function () {
    var a = new Promise((resolve,reject) => setTimeout(() => {
        reject(1)
    }, 2000))
    var b = new Promise((resolve, reject) => setTimeout(() => {
        reject(2)
    }, 1000))
    any([a, b]).then(v => console.log(JSON.stringify(v)), err => {
        console.log(err.errors)
    })
})()