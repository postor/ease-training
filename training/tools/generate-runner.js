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
  ;
(async () => {
  let todoList = await getJob(0)
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
  const model = await Model.readOne({ params: { id: train.model_id } })
  const envs = {
    TRAIN_ID: train.id,
    RESTFUL_ENDPOINT: process.env.RESTFUL_ENDPOINT
  }
  const volumes = {
    '':''
  }

  fs.writeFileSync(join(__dirname, '..', 'tmp.sh'),
    `set -x && docker run --rm --gpus all `)

})()

async function getJob(workingState) {
  const workingList = Train.read({
    params: {
      limit: 1,
      working: workingState
    }
  }).data || []

  return workingList
}

function waitMiliseconds(miliseconds) {
  return new Promise(resolve => setTimeout(resolve, miliseconds))
}

