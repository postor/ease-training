
import DatasetList from '../components/DatasetList'
import { update } from '../store/dataset'
import wrapper from '../store'
const Index = () => {
  return (<div>
    <h1>ease training</h1>
    <p>Prepare a dataset and I will train with models and compare</p>

    <h2>datasets</h2>
    <DatasetList />

    <h2>models</h2>
  </div>)
}



Index.getInitialProps = async ({store}) => {
  await store.dispatch(update())
  console.log('dipatched')
}

export default wrapper(Index)