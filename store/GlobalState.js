import React, { useState } from 'react'

export const DataContext = React.createContext()



export const DataProvider = ({children}) => {
  const initUser = { id: '', name: '', avatar: '', createdAt: '' }
  const [userState, setUserState] = useState(initUser)

  const value = {
    userState,
    setUserState
  }
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
