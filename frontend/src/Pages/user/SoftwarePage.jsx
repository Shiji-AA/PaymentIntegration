import React from 'react'
import Navbar from '../../Components/User/Navbar/Navbar1'
import Footer from '../../Components/User/Footer/Footer'
import SoftwareHero from '../../Components/User/Hero/SoftwareHero'
import Software from '../../Components/User/Courses/Software'

function SoftwarePage() {
    return (
        <div>
            <Navbar/>            
            <SoftwareHero/>
            <Software/>
            <Footer/>            
        </div>
    )
}
export default SoftwarePage
