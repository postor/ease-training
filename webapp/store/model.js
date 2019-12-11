

import getModel from './get-model'
import getPath from './get-path'
export const PREFIX = 'model'

const modelModel = getModel('model')

export const update = (force = true) => async (dispatch, getState) => {
  if (!force && getPath(getState(), PREFIX)) {
    return
  }
  const list = (await modelModel.read()).data || []
  const dic = {}
  list.forEach((x) => dic[x.id] = x)
  dispatch({
    type: 'SET',
    path: PREFIX,
    value: {
      list,
      dic
    }
  })
}

