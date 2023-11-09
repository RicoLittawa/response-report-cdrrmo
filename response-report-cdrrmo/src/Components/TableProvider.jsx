import React, { useState } from 'react'
import TableContext from '../context/TableContext'

const TableProvider = ({children}) => {

  const [count,setCount]= useState(20)
  return (
    <TableContext.Provider value={{count}}>{children}</TableContext.Provider>
  )
}

export default TableProvider