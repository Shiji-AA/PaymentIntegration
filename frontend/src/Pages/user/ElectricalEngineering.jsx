import React from 'react'
import Navbar from '../../Components/User/Navbar/Navbar1'
import Footer from '../../Components/User/Footer/Footer'
import Electrical from '../../Components/User/Courses/Electrical'
import ElectricalHero from '../../Components/User/Hero/ElectricalHero'

function ElectricalEngineering() {
    return (
        <div>
            <Navbar/>  
            <ElectricalHero/>          
            <Electrical/>
            <Footer/>

            
        </div>
    )
}

export default ElectricalEngineering
