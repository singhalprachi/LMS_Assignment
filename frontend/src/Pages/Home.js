import React from 'react'

import About from '../components/About'
import Footer from '../components/Footer'
import ImageSlider from '../components/ImageSlider'
import News from '../components/News'
import PhotoGallery from '../components/PhotoGallery'
import PopularBooks from '../components/PopularBooks'
import RecentAddedBooks from '../components/RecentAddedBooks'
import ReservedBooks from '../components/ReservedBooks'
import Stats from '../components/Stats'
import WelcomeBox from '../components/WelcomeBox'

function Home() {
    return (
        <div id='home'>
            <WelcomeBox/>
            
            <RecentAddedBooks/>
            <PopularBooks/>
            
        
            <About/>
            <Footer/>
        </div>
    )
}

export default Home
