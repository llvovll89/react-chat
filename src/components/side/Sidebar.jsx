import React , { useState }  from 'react'
import ChatList from './ChatList'
import Navbar from '../navbar/Navbar'
import Search from './Search'
import './Side.css'
import { useWrapContext } from '../../context/WrapContext'

const Sidebar = () => {
  const [active, setActive] = useState(true);
  const { dark , logModal } = useWrapContext();

  return (
    <>
      <div className={active ? "sidebar" : "mobile-sidebar"} 
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