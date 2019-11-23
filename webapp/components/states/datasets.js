
import createSharedState from 'react-hook-shared-state'
import getModel from '../../components/get-model'
const datasetModel = getModel('dataset')

const [useSharedState, setSharedState] = createSharedState([])
  ;

export const update = async () => {
  const list = await datasetModel.query({})
  if (list && list.length) {
    setSharedState(list)
  }
}

update()
export const useState = useSharedState

export const model = datasetModel