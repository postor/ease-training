import { useRef, useState } from 'react'
import Router from 'next/router'
import swal from 'sweetalert2'
import getUnixTime from 'date-fns/getUnixTime'
import getModel from '../../store/get-model'
import wrapper from '../../components/layout'
import { update } from '../../store/dataset'
const modelModel = getModel('model')
const trainModel = getModel('train')


const Create = ({dispatch}) => {
  const fileInput = useRef()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileSize, setFileSize] = useState(0)

  return (<div>
    <h1>create dataset</h1>
    <p>upload your voc like format dataset zip here, structure like:</p>
    <pre>
      [dataset-name].zip
      <br />  |--Annotations
      <br />  |--ImageSets
      <br />  |--JPEGImages
    </pre>
    <input ref={fileInput} type="file" ></input>
    <div>
      {uploading ? (<span>
        <progress
          max="1"
          min="0"
          value={progress}
        />
        <span>{Math.floor(progress * fileSize / 1024 / 1024)}/{Math.floor(fileSize / 1024 / 1024)}M</span>
      </span>) : (<button
        onClick={() => {
          if (!fileInput.current.files[0]) {
            return swal.fire('select a file first', '', 'error')
          }
          setUploading(true)

          // upload a file to the server.
          const socket = io.connect()
          const file = fileInput.current.files[0]
          const stream = ss.createStream()
          ss(socket).emit('dataset', stream, { size: file.size, name: file.name })
          setFileSize(file.size)

          const blobStream = ss.createBlobReadStream(file)
          let size = 0
          blobStream.on('data', function (chunk) {
            size += chunk.length
            setProgress(size / file.size)
          })
          blobStream.on('end', async function () {
            swal.fire({
              title: '',
              text: 'creating dataset...',
              showConfirmButton: false
            })
            console.log(file.name,'file.name',file)
            const dataset = await modelModel.create({
              name: file.name,
              created_at: getUnixTime(new Date())
            })
            await dispatch(update())
            swal.close()
            swal.fire({
              title: '',
              text: 'adding training jobs...',
              showConfirmButton: false
            })

            const models = await modelModel.read()
            for (let i = 0; i < models.length; i++) {
              await trainModel.create({
                dataset_id: dataset.id,
                model_id: models[i].id,
                created_at: getUnixTime(new Date())
              })
            }
            swal.close()
            await swal.fire(`dataset ${file.name} created!`, '', 'success')

            Router.push(`/dataset/view?id=${dataset.id}`)
          })
          blobStream.pipe(stream)
        }}
      >upload dataset</button>)}
    </div>
  </div>)
}

export default wrapper(Create)