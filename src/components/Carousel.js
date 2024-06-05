import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';
import myImage from './download-compresskaru.com (1).png';

const CustomCarousel = () => {
  const images = [
    
    'https://c8.alamy.com/comp/B8CXC4/fv2102-greg-huszar-bunch-old-radios-piled-up-old-technology-B8CXC4.jpg',
    myImage,
    'https://via.placeholder.com/800x400',
  ];

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      autoPlay
      interval={3000}
      dynamicHeight
    >
      {images.map((image, index) => (
        <div key={index} className="carousel-item">
          <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
          <div className="legend">Slide {index + 1}</div>
        </div>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
