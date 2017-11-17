let http = require('http')
let fs = require('fs')
let path = require('path')
let urlParser = require('url').parse

let server = http.createServer((req, res) => {
  let { url } = req
  let { pathname }  = urlParser(url)

  if (pathname === '/') pathname = '/index.html'
    publicParser(pathname).then(ret => {
      res.writeHead(200, 'OK')
      // delay script 
      if (pathname === '/style.css') {
          setTimeout(() => {
            res.end(ret)
          }, 2000) 
      } else {
          res.end(ret)
      }
    }).catch(error => {
        console.log(error)
    })
}).listen(8808, () => {
  console.log('A server is started on PORT=8808')
})

function publicParser(url) {
  let staticUrl = path.resolve(process.cwd(), url.substr(1))
  return new Promise((resolve, reject) => {
    fs.readFile(staticUrl, (error, content) => {
      if (error) {
        reject(error)
      } else {
        resolve(content)
      }
    })
  })
}