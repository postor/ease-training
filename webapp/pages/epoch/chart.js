import layout from '../../components/layout'
import connect from '../../store/connect-path'
import { update as updateDatasets, PREFIX as datasetPrefix } from '../../store/dataset'
import { update as updateModels, PREFIX as modelPrefix } from '../../store/model'
import EpocheChart from '../../components/EpocheChart'
import getModel from '../../store/get-model'


const View = ({ train, model, dataset, epochs }) => {
  if (!(train && model && dataset)) return (<div>not found</div>)

  return (<div>
    <h1>{dataset.name}/{model.name}</h1>
    <div>
      <EpocheChart epochs={epochs} />
    </div>
  </div>)
}



View.getInitialProps = async ({ query: { id } }) => {
  try {
    const train = (await getModel('train').readOne({ params: { id } })).data
    const model = (await getModel('model').readOne({ params: { id: train.model_id } })).data
    const dataset = (await getModel('dataset').readOne({ params: { id: train.dataset_id } })).data
    const epochs = (await getModel('epoch').read({ params: { job_id: id } })).data

    return { train, model, dataset, epochs }
  }catch(e){
    console.log(e)
  }
}

export default layout(View)