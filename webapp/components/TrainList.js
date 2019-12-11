import Link from 'next/link'
import connect from '../store/connect-path'
import { PREFIX } from '../store/train'

const statusLabels = {
  '0': 'waiting',
  '1': 'working',
  '2': 'finished',
}

const Trains = ({ trains = [], modelDic = {} }) => {
  if (!trains.length) return (<div>
    <p>no training job yet, <Link href="/dataset/create"><a>create a dataset first!</a></Link></p>
  </div>)

  return (<div>
    <table>
      <thead>
        <tr>
          <th>model</th><th>status</th><th>mean AP</th>
        </tr>
      </thead>
      <tbody>
        {trains.map(x => (<tr key={x.id}>
          <td><Link href={`/epoch/chart?id=${x.id}`}><a>{modelDic[x.model_id].name}</a></Link></td>
          <td>{statusLabels[x.working]}</td>
          <td>{x.m_ap}</td>
        </tr>))}
      </tbody>
    </table>
  </div>)
}

export default ({ datasetId = 0 }) => {
  const List = connect({
    trains: `${PREFIX}.${datasetId}`,
    modelDic: `model.dic`
  })(Trains)
  return <List />
}
