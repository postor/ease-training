import Head from 'next/head'
import Link from 'next/link'
import wrapper from '../store'


const layout = (Page) => wrapper(class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <Head>
        <title>ease training</title>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/socket.io-stream.js"></script>
      </Head>
      <Link href="/"><a>home</a></Link>
      <hr />
      <Page {...this.props} />
    </div>)
  }

  static getInitialProps = async (ctx) => {
    return await Promise.all([
      Page.getInitialProps ? Page.getInitialProps(ctx) : Promise.resolve(true),
    ])
  }
})


export default layout