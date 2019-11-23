import Head from 'next/head'
import Link from 'next/link'

const DefaultLayout = ({ children }) => (<div>
  <Head>
    <title>ease training</title>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/js/socket.io-stream.js"></script>
  </Head>
  <Link href="/"><a>home</a></Link>
  <hr />
  {children}
</div>)

export default DefaultLayout