import DefaultLayout from '../components/DefaultLayout'
import DatasetList from '../components/DatasetList'

export default () => {

  return (<DefaultLayout>
    <h1>ease training</h1>
    <p>Prepare a dataset and I will train with models and compare</p>

    <h2>datasets</h2>
    <DatasetList />

    <h2>models</h2>
  </DefaultLayout>)
}

