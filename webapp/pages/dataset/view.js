import DefaultLayout from '../../components/DefaultLayout'
import { useState } from '../../components/states/datasets'

const View = ({ query: { id } }) => {

  const datasets = useState()
  console.log(datasets, 'datasets')
  const dataset = datasets.filter(x => x.id == id)[0]
  if (!dataset) {
    return (<div>error!</div>)
  }

  return (<DefaultLayout>
    <h1>{dataset.name}</h1>
    <p>
      {JSON.stringify(dataset)}
    </p>
  </DefaultLayout>)
}

View.getInitialProps = ({ query }) => {
  return { query }
}

export default View