import fromUnixTime from 'date-fns/fromUnixTime'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default (timestamp)=>formatDistanceToNow(fromUnixTime(timestamp))