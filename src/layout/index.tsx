import { useState } from "react"

export default function Layout ({children}: any){
    const [darkMode, setDarkMode] = useState(false)

    const activateDarkMode = () =>{
        setDarkMode(!darkMode)
    }
    return(
        <div className={`${darkMode ? "text-white bg-[#11141C]" :""} w-full h-full p-4 `}>
        <header className="flex items-center justify-between">
            <h1>AirSave</h1>
            <span onClick={activateDarkMode}>
            {
                darkMode ? 
                <ion-icon name="moon-outline" size="large"></ion-icon>
                :
                <ion-icon name="sunny-outline" size="large"></ion-icon>
            }
            </span> 
            
        </header>
        <main className="flex flex-col items-center space-y-6">
            {children}
        </main>
        <footer>
            <nav className="flex items-center justify-center">
                <ul className="flex items-center space-x-6">
                    <li><ion-icon name="home-outline" size="large"></ion-icon></li>
                    <li><ion-icon name="radio-button-on-outline" size="large"></ion-icon></li>
                    <li><ion-icon name="flash-outline" size="large"></ion-icon></li>
                </ul>
            </nav>
        </footer>
        </div>
    )
}