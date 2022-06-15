import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Whatsapp Chat App</title>
      </Head>
      <Sidebar/>
    </div>
  )
}
