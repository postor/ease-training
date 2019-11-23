
import { useState } from './states/datasets'
import Link from 'next/link'

export default () => {
  const [datasets = []] = useState()
  if (!datasets.length) return (<div>
    <p>no dataset yet, <Link href="/dataset/create"><a>create one!</a></Link></p>
  </div>)

  return (<ul>
    {datasets.map(x => (<li key={x.id}>
      <Link href={`/dataset/view?id=${x.id}`}><a>{x.name}</a></Link>
    </li>))}
  </ul>)

}
