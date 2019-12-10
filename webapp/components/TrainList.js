import Link from 'next/link'
import connect from '../store/connect-path'
import { PREFIX } from '../store/dataset'

const Trains = ({ trains = [] }) => {
  if (!trains.length) return (<div>
    <p>no training job yet, <Link href="/dataset/create"><a>create a dataset first!</a></Link></p>
  </div>)

  return (<div>
    <ul>
      {trains.map(x => (<li key={x.id}>
        <Link href={`/dataset/view?id=${x.id}`}><a>{x.name}</a></Link>
      </li>))}
    </ul>
  </div>)
}

export default ({ datasetId = 0 }) => {
  const List = connect({ trains: `${PREFIX}.${datasetId}` })(Trains)
  return <List />
}
