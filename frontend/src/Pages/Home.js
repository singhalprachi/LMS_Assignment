import React from 'react'

import About from '../components/About'
import Footer from '../components/Footer'
import PopularBooks from '../components/PopularBooks'
import RecentAddedBooks from '../components/RecentAddedBooks'
import WelcomeBox from '../components/WelcomeBox'

function Home() {
    return (
        <div id='home'>
            <WelcomeBox />
            <RecentAddedBooks />
            <PopularBooks />
            <About />
            <Footer />
        </div>
    )
}

export default Home

