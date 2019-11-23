import * as RestService from 'restful-model'

const HOSTURI = process.env.HOSTURI || 'http://localhost:3000'
const relativePath = '/restful'

const baseUrl = typeof window === 'undefined'
  ? HOSTURI + relativePath
  : relativePath;

const userService = new RestService(baseUrl)
export default (tableName) => userService.registerModel(tableName, '/' + tableName)