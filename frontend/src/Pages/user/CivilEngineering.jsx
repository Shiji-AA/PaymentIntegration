import React from 'react'

import CivilHero from '../../Components/User/Hero/CivilHero'
import Civil from '../../Components/User/Courses/Civil'
import Footer from '../../Components/User/Footer/Footer'
import Navbar1 from '../../Components/User/Navbar/Navbar1'

function CivilEngineering() {
    return (
        <div>
            
            <Navbar1/>             
            <CivilHero/>
            <Civil/>
            <Footer/>
            
        </div>
    )
}

export default CivilEngineering
