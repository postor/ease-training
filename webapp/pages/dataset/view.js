import layout from '../../components/layout'
import connect from '../../store/connect-path'
import { update as updateDatasets, PREFIX } from '../../store/dataset'
import { update as updateTrains } from '../../store/train'
import TrainList from '../../components/TrainList'

const View = ({ id, datasets = [] }) => {
  if (!datasets.length) return (<div>not found</div>)
  console.log(datasets, 'datasets')
  const dataset = datasets.filter(x => x.id == id)[0]
  if (!dataset) {
    return (<div>error!</div>)
  }

  return (<div>
    <h1>{dataset.name}</h1>
    <p>
      <TrainList datasetId={id} />
      {JSON.stringify(dataset)}
    </p>
  </div>)
}

const ConnectedView = connect({ datasets: PREFIX })(View)

const WrappedView = ({ query: { id } }) => (<ConnectedView id={id} />)

WrappedView.getInitialProps = async ({ query, store }) => {
  await Promise.all([
    store.dispatch(updateDatasets(false)),
    store.dispatch(updateTrains(query.id, false)),
  ])
  return { query }
}

export default layout(WrappedView)