// pages/index.js
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
        }
    }
}
}`

const ImageSlideshow = () => {
  const images = [
    '/images/1-Tokyo-Meiji_Shrine.jpg',
    '/images/2-Tokyo-Meiji_Park.jpg',
    '/images/3-Tokyo-Shinjuku.jpg',
    // Add more image paths as needed
  ];

  return (
    <CarouselStyles>
        <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        >
        {images.map((image, index) => (
            <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
            {/* Add associated text here */}
            <p>Associated Text for Slide {index + 1}</p>
            </SwiperSlide>
        ))}
        </Swiper>
    </CarouselStyles>
  );
};

export default ImageSlideshow;
