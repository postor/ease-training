import { ResourceBuilder } from 'axios-rest-resource'

const RESTFUL_ENDPOINT = process.env.RESTFUL_ENDPOINT || 'http://localhost:3000/restful'
const relativePath = '/restful'

const baseURL = typeof window === 'undefined'
  ? RESTFUL_ENDPOINT
  : relativePath;

const resourceBuilder = new ResourceBuilder({
  baseURL,
})

export default (tableName) => resourceBuilder.build(`/${tableName}`)