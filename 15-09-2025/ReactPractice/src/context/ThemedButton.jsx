import { useContext } from "react"
import ThemeContext from "./ThemeContext"

const ThemedButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    console.log('theme', theme)

    return (<>
        <button onClick={toggleTheme} style={{ backgroundColor: theme === 'light' ? '#fff' : '#000', color: theme === 'light' ? '#333' : '#fff' }} >
            Change
        </button>
    </>)


}

export default ThemedButton