import React from 'react'
import Navbar from '../../Components/User/Navbar/Navbar1'
import Footer from '../../Components/User/Footer/Footer'
import Mechanical from '../../Components/User/Courses/Mechanical'
import MechanicalHero from '../../Components/User/Hero/MechanicalHero'

function MechanicalEngineering() {
    return (
        <div>
            <Navbar/>
            <MechanicalHero/>
            <Mechanical/>
            <Footer/>            
        </div>
    )
}
export default MechanicalEngineering
