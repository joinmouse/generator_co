const fs = require('fs').promises

// 异步的读文件
async function readfn() {
    try {
        let content = await fs.readFile('./file/age.txt', 'utf8')
        let r = await fs.readFile(content, 'utf8')
        return r
    }catch(e) {
        console.log('err' + e)
    }
}

readfn().then(res => {
    console.log(res)
})