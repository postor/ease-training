import { ResourceBuilder } from 'axios-rest-resource'

const HOSTURI = process.env.HOSTURI || 'http://localhost:3000'
const relativePath = '/restful'

const baseURL = typeof window === 'undefined'
  ? HOSTURI + relativePath
  : relativePath;

const resourceBuilder = new ResourceBuilder({
  baseURL,
})

export default (tableName) => resourceBuilder.build(`/${tableName}`)