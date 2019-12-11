import Link from 'next/link'
import connect from '../store/connect-path'
import { PREFIX } from '../store/dataset'
import unix2now from './unix2now'

const DatasetList = ({ datasets = [] }) => {
  if (!datasets.length) return (<div>
    <p>no dataset yet, <Link href="/dataset/create"><a>create one!</a></Link></p>
  </div>)

  return (<div>
    <ul>
      {datasets.map(x => (<li key={x.id}>
        <Link href={`/dataset/view?id=${x.id}`}><a>{x.name}</a></Link>
        <span style={{ marginLeft: '15px', color: 'gray' }}>created {unix2now(x.created_at)} ago</span>
      </li>))}
    </ul>
    <Link href="/dataset/create"><a>add another one!</a></Link>
  </div>)

}

export default connect({ datasets: PREFIX })(DatasetList)