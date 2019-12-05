import layout from '../../components/layout'

const View = ({ query: { id } }) => {
  const datasets = []
  if(!datasets.length) return (<div>not found</div>)
  console.log(datasets, 'datasets')
  const dataset = datasets.filter(x => x.id == id)[0]
  if (!dataset) {
    return (<div>error!</div>)
  }

  return (<div>
    <h1>{dataset.name}</h1>
    <p>
      {JSON.stringify(dataset)}
    </p>
  </div>)
}


View.getInitialProps = ({ query }) => {
  return { query }
}

export default layout(View)