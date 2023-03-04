import React from 'react'
import Chat from '../components/chat/Chat'
import Sidebar from '../components/side/Sidebar'

const Home = () => {
  return (
    <>
      <div className='home_container'>
      <div className="content">
        <Sidebar />
        <Chat />
        </div>
      </div>
    </>
  )
}

export default Home