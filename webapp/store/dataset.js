

import getModel from './get-model'
import getPath from './get-path'
export const PREFIX = 'dataset.list'

const datasetModel = getModel('dataset')

export const update = (force = true) => async (dispatch, getState) => {
  if (!force && getPath(getState(), PREFIX)) {
    return
  }
  const list = (await datasetModel.read()).data
  dispatch({
    type: 'SET',
    path: PREFIX,
    value: list
  })
}

