import getModel from './get-model'
import getPath from './get-path'
export const PREFIX = 'epoch.list'

const epochModel = getModel('epoch')

export const update = (trainId, force = true) => async (dispatch, getState) => {
  let prefix = `${PREFIX}.${trainId}`
  if (!force && getPath(getState(), prefix)) {
    return
  }
  const list = (await epochModel.read({
    params: {
      train_id: trainId,
    }
  })).data
  dispatch({
    type: 'SET',
    path: prefix,
    value: list
  })
}

