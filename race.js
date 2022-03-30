/**
 * 传入数组
 * then 接收两个参数，启动全部Promise
 * 非Promise直接reolve
 * race是获取最快执行的结果，不管成功还是失败
 * {Array<any>} pr
 * 注：如果传入空数组，会被永远挂起
 */
 function promiseRace(pr = []) {
    return new Promise((resolve,reject) => {
        for (let p of pr) {
            if(p instanceof Promise){
                p.then(resolve,reject)
            }
            else{
                resolve(p)
                break;
            }
        }
    })
}

(function(){
    var a  = new Promise(resolve=>setTimeout(() => {
        resolve(1)
    }, 2000))
    var b  = new Promise(resolve=>setTimeout(() => {
        resolve(2)
    }, 1000))
    promiseRace([a,b]).then(v=>console.log(v))
})()