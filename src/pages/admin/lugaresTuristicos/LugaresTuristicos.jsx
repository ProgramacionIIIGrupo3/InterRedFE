//import React from 'react'

import FormTuristicos from "../../../components/admin/formTuristicos/FormTuristicos"
import Navbar from "../../../components/admin/navbar/Navbar"
import Sidebar from "../../../components/admin/sidebar/Sidebar"

const LugaresTuristicos = () => {
  return (
    <div className="lugaresTuristicos">
      <div className="content">
        <Navbar title="Lugares Turisticos"/>
        <FormTuristicos/>
      </div>
      <Sidebar />
    </div>
  )
}

export default LugaresTuristicos