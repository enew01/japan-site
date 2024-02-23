// pages/index.js
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import Swiper navigation styles
import 'swiper/css/pagination'; // Import Swiper pagination styles
import styled from 'styled-components';

const CarouselStyles = styled.section`
  position: relative;
  padding: 100px;
  height: 100vh;
  width: 100vw;
  .swiper {
    position: absolute;
    height: 70%;
    width: 100%;
    bottom: 10%;
    .swiper-slide {
      justify-content: center;
      display: flex;
      align-items: center;
      gap: 30px;
      img {
        height: 60vh;
        cursor: pointer; /* Add cursor pointer to indicate clickability */
      }
    }
  }
`;

const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  img {
    max-width: 80vw;
    max-height: 80vh;
  }
`;

const ImageSlideshow = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const images = [
    '/images/1-Tokyo-Meiji_Shrine.jpg',
    '/images/2-Tokyo-Meiji_Park.jpg',
    '/images/3-Tokyo-Shinjuku.jpg',
    // Add more image paths as needed
  ];

  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <CarouselStyles>
      <Swiper spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }}>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              onClick={() => openLightbox(image)} // Open lightbox on click
            />
            {/* Add associated text here */}
            <p>Associated Text for Slide {index + 1}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox onClick={closeLightbox}>
          <img src={lightboxImage} alt="Lightbox" />
        </Lightbox>
      )}
    </CarouselStyles>
  );
};

export default ImageSlideshow;
