import Link from 'next/link'
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter } from 'recharts'
import connect from '../store/connect-path'
import { PREFIX } from '../store/train'


const Chart = ({ trains = [], modelDic = {} }) => {
  if (!trains.length) return (<div>
    <p>no training job yet, <Link href="/dataset/create"><a>create a dataset first!</a></Link></p>
  </div>)

  const hueOffset = Math.round(360 / trains.length)
  let hueCurrent = 0
  const datas = trains.filter(x => x.working == 2).map(({ id, model_id, m_ap, val_avg_time }) => {
    hueCurrent += hueOffset
    return {
      id,
      name: modelDic[model_id].name,
      hue: `hsl(${hueCurrent}, 50%, 50%)`,
      data: [{
        m_ap: Math.round(m_ap * 1000) / 10,
        val_avg_time: val_avg_time ? Math.round(val_avg_time * 1000) : 0,
      }]
    }
  })
  console.log(datas.map(({name,data})=>({name,map:data[0].m_ap})))
  if (!datas.length) {
    return (<div>no data yet, please wait for training to finish!</div>)
  }

  return (<div>
    <ScatterChart width={750} height={250}
      margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="val_avg_time" name="time" unit="ms" />
      <YAxis dataKey="m_ap" name="mean AP" unit="%" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      {datas.map(({ id, name, hue, data }) => (<Scatter key={id} name={name} data={data} fill={hue} />))}
    </ScatterChart>
  </div>)
}

export default ({ datasetId = 0 }) => {
  const ModelCompare = connect({
    trains: `${PREFIX}.${datasetId}`,
    modelDic: `model.dic`
  })(Chart)
  return <ModelCompare />
}
