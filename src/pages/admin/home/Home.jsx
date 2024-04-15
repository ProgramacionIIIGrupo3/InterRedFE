//import React from 'react'
import Navbar from "../../../components/admin/navbar/Navbar.jsx"
import Sidebar from "../../../components/admin/sidebar/Sidebar.jsx"

const HomeAdmin = () => {
  return (
    <div className="main-container">
      <div className="content">
        <Navbar title="Dashboard"/>
      </div>
      <Sidebar />
    </div>
  )
}

export default HomeAdmin