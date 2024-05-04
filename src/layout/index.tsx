import MoonIcon from "../assets/icons/MoonIcon"
import SunIcon from "../assets/icons/SunIcon"
import HomeIcon from "../assets/icons/HomeIcon"
import ButtonIcon from "../assets/icons/ButtonIcon"
import FlashIcon from "../assets/icons/FlashIcon"
import { Link } from "react-router-dom"

export default function Layout ({action, children, darkMode, activateDarkMode}: any){
   
    return(
        <div className={`${darkMode ? "text-white bg-[#11141C]" :""} w-full h-full p-4 `}>
        <header className="flex items-center justify-between">
            <h1 className={`${darkMode ? "text-[#14ADF9]" : "text-[#108CCA]"} text-2xl`}><Link to ="/">AirSave</Link></h1>
            <span onClick={activateDarkMode}>
            {
                darkMode ? 
                 <MoonIcon/>
                :
                <SunIcon/>
            }
            </span> 
            
        </header>
        <main className="flex flex-col items-center space-y-6">
            {children}
        </main>
        <footer  className="flex items-center justify-center w-full">
            <nav className={` ${darkMode ? "shadow-white": ""} absolute bottom-4 rounded-lg shadow p-4 `}>
                <ul className={`flex ${darkMode ? "bg-white" :""}items-center space-x-10`}>
                    <li><Link to= "/"><HomeIcon/></Link></li>
                    <li onClick={action}><ButtonIcon/></li>
                    <li><Link to="/hero"><FlashIcon/></Link></li>
                </ul>
            </nav>
        </footer>
        </div>
    )
}