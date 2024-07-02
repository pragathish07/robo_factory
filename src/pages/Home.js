import React from 'react';
import Carousel from '../components/Carousel';
import Shop from '../components/Shop';
import './Home.css';
import TopPicks from '../components/TopPicks';
import Features from '../components/Features';
import car1 from '../components/car1.jpg';
import car2 from '../components/car2.jpg';
import car3 from '../components/car3.jpg';


const Home = () => {
  const images = [
    { url: car1, alt: 'Image 1' },
    { url: car2, alt: 'Image 2' },
    { url: car3, alt: 'Image 3' },

    // Add more images as needed
  ];

  return (
    
      <div className="home">
       
       <Carousel images={images} />
        <Shop />
        <TopPicks />
        <Features />
      </div>
    
  );
};

export default Home;
     
