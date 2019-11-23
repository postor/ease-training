const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  const httpServer = require('http').Server(server);
  const io = require('socket.io')(httpServer);
  require('./libs/init-io')(io, server)

  server.use('/restful', require('./restful/default-router'))

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  httpServer.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })

})