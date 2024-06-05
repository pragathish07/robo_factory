import React from 'react';

import CarouselComponent from '../components/Carousel';
import Shop from '../components/Shop';
import './Home.css';
import TopPicks from '../components/TopPicks';
import Features from '../components/Features';


const Home = () => {
  return (
    
      <div className="home">
        <CarouselComponent />
        <Shop />
        <TopPicks />
        <Features />
      </div>
    
  );
};

export default Home;
     
