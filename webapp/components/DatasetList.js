import Link from 'next/link'
import connect from '../store/connect-path'
import { PREFIX } from '../store/dataset'

const DatasetList = ({ datasets = [] }) => {
  if (!datasets.length) return (<div>
    <p>no dataset yet, <Link href="/dataset/create"><a>create one!</a></Link></p>
  </div>)

  return (<div>
    <ul>
      {datasets.map(x => (<li key={x.id}>
        <Link href={`/dataset/view?id=${x.id}`}><a>{x.name}</a></Link>
      </li>))}
    </ul>
    <Link href="/dataset/create"><a>add another one!</a></Link>
  </div>)

}

export default connect({ datasets: PREFIX })(DatasetList)