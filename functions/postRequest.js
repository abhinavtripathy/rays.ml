const https = require('https')

const data = ''

const options = {
  hostname: '3000-dot-5438594-dot-devshell.appspot.com',
  port: 3000,
  path: '/',
  method: 'POST'
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': data.length
//   }
}

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    process.stdout.write(d)
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()






// const request = require('request')

// request.post('https://3000-dot-5438594-dot-devshell.appspot.com/:3000', {
//   json: {
//   }
// }, (error, res, body) => {
//   if (error) {
//     console.error(error)
//     return
//   }
//   console.log(`statusCode: ${res.statusCode}`)
//   console.log(body)
// })
