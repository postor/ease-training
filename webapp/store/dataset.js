

import getModel from './get-model'
export const PREFIX = 'dataset.list'
const datasetModel = getModel('dataset')

export const update = () => async (dispatch) => {
  const list = (await datasetModel.read()).data
  dispatch({
    type: 'SET',
    path: PREFIX,
    value: list
  })
}

