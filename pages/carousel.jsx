// pages/index.js
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import styled from 'styled-components';


const CarouselStyles = styled.section`
  position: relative;
  padding: 100px;
  height: 100vh;
  width: 100vw;
  background: rgb(177,6,6);
background: linear-gradient(0deg, rgba(177,6,6,1) 11%, rgba(255,166,196,1) 91%);
  .swiper {
    position: absolute;
    height: 80%;
    width: 90%;
    bottom: 10%;
    .swiper-slide {
      padding: 45px 100px;
      .inner-wrap {
        width: 100%;
        height: 100%;
        position: relative;
        justify-content: center;
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 45px;
        border: solid 3px #FFF;
        background-color: #0e0e0e;
        border-radius: 30px;
      }
      .image-wrap {
        display: block;
        position: relative;
        width: auto;
        height: 100%;
        .click-notice {
          position: absolute;
          top: 0;
          left: 0;
          padding: 10px;
          background-color: #0e0e0e;
          color: #F0F0F0;
          font-family: arial;
          font-weight: 500;
          font-size: 16px;

        }
        img {
          height: 100%;
          cursor: pointer;
        }
      }
      .text-wrap {
        background-color: #F0F0F0;
        border: solid 2px #FFF;
        border-radius: 10px;
        padding: 25px 15px;
        font-family: arial;
        font-weight: 500;
        font-size: 24px;
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
  const texts = [
    'This is a string for the first box',
    'THis, however, is for the second',
    'And this, lastly, is for the third',
    ];

  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <CarouselStyles>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true} 
        modules={[Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="inner-wrap">
              <div className="image-wrap">
                <div className="click-notice">Click to Englarge</div>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              onClick={() => openLightbox(image)}
            /></div>
            <div className="text-wrap">{texts[index]}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {lightboxImage && (
        <Lightbox onClick={closeLightbox}>
          <img src={lightboxImage} alt="Lightbox" />
        </Lightbox>
      )}
    </CarouselStyles>
  );
};

export default ImageSlideshow;
