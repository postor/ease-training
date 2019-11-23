const ss = require('socket.io-stream')
const { join, basename } = require('path')
const { createWriteStream, ensureDir, remove } = require('fs-extra')
const { static } = require('express')

const SHARED_FOLDER = process.env.SHARED_FOLDER || join(__dirname, '..', '..', 'shared-files')
const datasetFolder = join(SHARED_FOLDER, 'datasets')

module.exports = (io, app) => {
  app.use('/js/socket.io-stream.js', static(join(__dirname, '..', 'node_modules', 'socket.io-stream', 'socket.io-stream.js')))
  io.on('connection', (socket) => {
    ss(socket).on('dataset', async (stream, data) => {
      const filename = basename(data.name)
      await ensureDir(datasetFolder)
      const dist = join(datasetFolder, filename)
      await remove(dist)
      stream.pipe(createWriteStream(dist))
    })
  })
}