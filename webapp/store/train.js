

import getModel from './get-model'
import getPath from './get-path'
export const PREFIX = 'train.list'

const trainModel = getModel('train')

export const update = (datasetId, force = true) => async (dispatch, getState) => {
  let prefix = `${PREFIX}.${datasetId}`
  if (!force && getPath(getState(), prefix)) {
    return
  }
  const list = (await trainModel.read({
    params: {
      dataset_id: datasetId,
    }
  })).data
  dispatch({
    type: 'SET',
    path: prefix,
    value: list
  })
}

