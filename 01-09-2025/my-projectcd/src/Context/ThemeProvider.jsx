import React, { createContext, useContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState('light')
    const [val,setVal] = useState('light')

    // useEffect(()=>{
    //     let oldTheme = localStorage.getItem('theme')
    //     setTheme(oldTheme)
    // },[])

    // useEffect(()=>{
    //     localStorage.setItem('theme', theme)
    //     setTheme()
    // },[theme])

  return (
    <ThemeContext.Provider value={{val, setVal}}>
        {children}
    </ThemeContext.Provider>    
)
}

export const useTheme = ()=>{
    const val = useContext(ThemeContext)
    if(val === undefined) throw new Error('Context is null')
    return val
}

export default ThemeProvider
