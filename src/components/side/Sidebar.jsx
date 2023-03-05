import React from 'react'
import ChatList from './ChatList'
import Navbar from '../navbar/Navbar'
import Search from './Search'
import { useWrapContext } from '../../context/WrapContext'
import './Side.css'

const Sidebar = () => {
  const { dark } = useWrapContext();

  return (
    <>
      <div className="sidebar" 
        style={{background: dark ? "#181818" : "#ffffff" }}
      >
        <Navbar />
        <Search />
        <ChatList />
      </div>
    </>
  )
}

export default Sidebar