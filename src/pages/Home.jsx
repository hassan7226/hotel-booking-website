import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers' 
import Testimonails from '../components/Testimonails'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedDestination/>
      <ExclusiveOffers/>
      <Testimonails/>
      <NewsLetter/>
      
    </div>
  )
}

export default Home
