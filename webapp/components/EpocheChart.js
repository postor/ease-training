import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import unix2now from '../components/unix2now'

export default ({ epochs = [] }) => {
  if (!epochs.length) return (<div>
    <p>no epoch yet!</p>
  </div>)

  return (<div>
    <LineChart width={730} height={250} data={epochs}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis dataKey="m_ap" label={{ value: "mean AP", position: "insideTopLeft", dy: 10 }} />
      <XAxis dataKey="epoch_num" label={{ value: "epoch number", position: "insideBottomRight", dy: 10 }} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="m_ap" stroke="#8884d8" />
    </LineChart>
  </div>)
}