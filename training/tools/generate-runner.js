const fs = require('fs')
const { join } = require('path')
const { ResourceBuilder } = require('axios-rest-resource')

const WORKING_STATE_NOT_STARTED = 0
const WORKING_STATE_WORKING = 1
const IDLE_WAITING = 1000

const baseURL = process.env.RESTFUL_ENDPOINT || 'http://localhost:3000/restful'

const resourceBuilder = new ResourceBuilder({
  baseURL,
})

const getModel = (tableName) => resourceBuilder.build(`/${tableName}`)

const Train = getModel('train')
const Model = getModel('model')
const Dataset = getModel('dataset')

  ;
(async () => {
  try {
    let todoList = await getJob(WORKING_STATE_NOT_STARTED)
    while (!todoList.length) {
      console.log(`No job to do, wait for ${IDLE_WAITING} miliseconds ...`)
      await waitMiliseconds(IDLE_WAITING)
      todoList = await getJob(1)
    }
    const train = todoList[0]
    console.log(`Job found, ${JSON.stringify(train)}`)
    train.working = WORKING_STATE_WORKING
    await Train.update({ data: train, params: { id: train.id } })
    console.log(`Job updated, ${JSON.stringify(train)}`)
    const model = (await Model.readOne({ params: { id: train.model_id } })).data
    const dataset = (await Dataset.readOne({ params: { id: train.dataset_id } })).data

    const params = [
      '--rm',
      '--gpus all',
      `--env TRAIN_ID=${train.id}`,
      `--env RESTFUL_ENDPOINT=${process.env.RESTFUL_ENDPOINT}`,
      `-v ${process.env.SHARED_FILES}:/shared-files`,
      `-v ${process.env.SHARED_FILES + '/datasets/' + dataset.name}:/dataset.zip`,
    ]
    const cmd = `${model.docker_cmd} --save-prefix=/shared-files/params/${dataset.name}/${model.name}`
    fs.writeFileSync(join(__dirname, 'tmp.sh'),
      `set -x && docker run ${params.join(' ')} postor/ease-training ${cmd}`)
  } catch (e) {
    console.log(e)
    process.exit(2)
  }
})()

async function getJob(workingState) {
  return (await Train.read({
    params: {
      limit: 1,
      working: workingState
    }
  })).data || []
}

function waitMiliseconds(miliseconds) {
  return new Promise(resolve => setTimeout(resolve, miliseconds))
}

