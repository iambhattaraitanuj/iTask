import {React, useState} from 'react'
import { createContext } from 'react'

export const AuthContext = createContext()

const Context = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default Context
