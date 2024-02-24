// pages/index.js
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import styled from 'styled-components';


const CarouselStyles = styled.section`
  position: relative;
  height: 100vh;
  width: 100vw;
  background: rgb(177,6,6);
background: linear-gradient(0deg, rgba(177,6,6,1) 11%, rgba(255,166,196,1) 91%);
.title {
  position: absolute;
  top: 5%;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  display: inline-block;
  font-size: 44px;
  font-weight: 700;
  font-family: arial;
  @media (max-width: 1100px) {
    display: none;
  }
}
  .swiper {
    position: absolute;
    height: 85%;
    width: 95%;
    bottom: 5%;
    right: 0;
    left: 0;
    margin: auto;
    @media (max-width: 1100px) {
      height: 98%;
      top: 0;
      bottom: 0;
    }
    .swiper-slide {
      padding: 45px 100px;
      @media (max-width: 1100px) {
        padding: 15px 0px;
        height: 95%;
      }
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
        @media (max-width: 1100px) {
          padding: 25px;
        }
      }
      .counter {
        position: absolute;
        display: block;
        right: 20px;
        top: 20px;
        background-color: #F0F0F0;
        color: #0e0e0e;
        height: 40px;
        width: 40px;
        padding: 3px;
        border-radius: 30px;
        text-align: center;
        font-size: 24px;
        font-weight: 700px;
        font-family: arial;
        z-index: 10;
        border: solid 2px #0e0e0e;
      }
      .image-wrap {
        display: block;
        position: relative;
        width: auto;
        height: 100%;
        overflow: hidden;
        @media (max-width: 1100px) {
          width: 100%;
        }
        .click-notice {
          position: absolute;
          top: -15px;
          left: -15px;
          padding: 25px 15px 15px 25px;
          background-color: #0e0e0e;
          color: #F0F0F0;
          font-family: arial;
          font-weight: 700;
          font-size: 16px;
          border-radius: 15px;

        }
        img {
          height: 100%;
          cursor: pointer;
          @media (max-width: 1100px) {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .text-wrap {
        background-color: #F0F0F0;
        border: solid 2px #FFF;
        border-radius: 10px;
        padding: 25px 15px;
        font-family: arial;
        font-weight: 500;
        font-size: 30px;
        max-width: 40%;
        @media (max-width: 1100px) {
          display: none;
        }
      }
    }
  }
  .button-wrap {
    position: absolute;
    z-index: 1000;
    display: block;
    &.next {
      top: 50%;
      right: 0;
      @media (max-width: 1100px) {
        top: unset;
        bottom: 10px;
      }
    }
    &.prev {
      top: 50%;
      left: 0;
      @media (max-width: 1100px) {
        top: unset;
        bottom: 10px;
      }
    }
    button {
      border: none;
      background-color: #0e0e0e;
      color: #F0F0F0;
      text-transform: uppercase;
      font-family: arial;
      font-weight: 700;
      font-size: 36px;
      border: solid 2px; #F0F0F0;
      padding: 12px;
      border-radius: 10px;
      &:hover {
        cursor: pointer;
        border: solid 2px; #0e0e0e;
        background-color: #F0F0F0;
        color: #0e0e0e;
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
  @media (max-width: 1100px) {
    flex-direction: column;
  }
  img {
    max-width: 80vw;
    max-height: 80vh;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  .lightbox-text {
    display: none;
    @media (max-width: 1100px) {
      display: block;
      background-color: #F0F0F0;
      border: solid 2px #FFF;
      border-radius: 10px;
      padding: 25px 15px;
      font-family: arial;
      font-weight: 500;
      font-size: 30px;
      margin: 20px;
    }
  }
`;

const ImageSlideshow = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [textboxImage, setTextboxImage] = useState(null);

  const images = [
    '/images/0-Tokyo-Downtown.jpg',
    '/images/2-Tokyo-National_Museum.jpg',
    '/images/3-Tokyo-Bishamonten.jpg',
    '/images/4-Tokyo-Kabuki_robe.jpg',
    '/images/3-Tokyo-Shinjuku.jpg',
    '/images/5-Tokyo-Meiji_Shrine.jpg',
    '/images/6-Tokyo-Meiji_Park.jpg',
    '/images/7-Tokyo-Skytree.jpg',
    '/images/10-Kamakura-Daibutsu.jpg',
    '/images/10-Kamakura-Food.jpg',
    '/images/9-Enoshima-Sea_Candle.jpg',
    '/images/9-Enoshima-Underground_caves.jpg',
    '/images/11-Kyoto-Fushimi_Inari.jpg',
    '/images/12-Kyoto-Inari_Gates.jpg',
    '/images/13-Kyoto-Ikebana.jpg',
    '/images/13-Kyoto-MtKurama.jpg',
    '/images/14-Osaka-Dotonbori.jpg',
    '/images/15-Osaka-Dotonbori_Crabs.jpg',
    '/images/16-Himeji-Himeji_Castle.jpg',
    '/images/17-KokoEn-Koko_En_garden.jpg',
    '/images/18-KokoEn-Hibiscus.jpg',
    '/images/19-Osaka-Sumiyoshi.jpg',
    '/images/19-Shinkansen-MtFuji.jpg',
  ];
  const texts = [
    'My trip started in Tokyo, largest city in the world. While it’s certainly a lot bigger than Chicago, being an earthquake-prone country meant it was all much lower to the ground. It could certainly feel claustrophobic at times, particularly with how tall I am.',
    'The Tokyo National Museum in Ueno Park is devoted to the art and antiquities of Japan, and houses many of their national treasures. It’s a beautiful building, and a great modern museum.',
    'This wooden statue of the Buddhist guardian deity Bishamonten was carved from a tree trunk over 1,100 years ago during Japan’s Heian period. This statue was already over a century old when William the Conqueror crossed the English Channel and its condition is still remarkable.',
    'This robe was used for Kabuki theatre over 100 years ago. Covered in images of autumn plants , its patterns and styles were meant to denote a nobleman or military general character in Kabuki’s exaggerated dramatic style.',
    'This is the Toho theatre in the Tokyo district of Shinjuku. Toho has been both the theatre and production company that has produced every Godzilla film since 1954, and so of course they keep their most famous monster forever looming over their first theatre, while advertising his newest movie below.',
    '2-	This is Meiji Shrine in Southern Tokyo. In Japan’s Shinto-Buddhist religion, the Emperor of Japan is both the spiritual head of the country and also semi-divine. This is the shrine of Emperor Meiji, who was responsible for opening Japan to the world in the 1860s and ending the Shogunate that had ruled Japan for nearly 300 years.',
    'The Meiji Shrine is, like many shrines and temples, surrounded by a large natural park. This is only a short walk from the last photo and shows how this old forest has been preserved as a sizable park in the center of Tokyo, the densest city in the world.',
    'And there’s me! Doing my best to overcome my fear of heights on the observation platform of the Tokyo Skytree, the tallest building in Japan.',
    'We depart Tokyo to go to one of its old capitals, Kamakura. About an hour and a half by train from Tokyo, one of the main draws is Kotoku-In, a temple finished in 1252 famed for its 43ft statue of the Buddha Amitabha. This statue is so old and so well-known it’s been in art and photographs going back over a century. I saw an 18th-century painting of it in a museum in Vienna!',
    'The food across the trip, both modern and traditional, was amazing! This was from a restaurant in Kamakura, with the main dish being eel on rice in a clay pot. Without a doubt some of the best seafood I’ve ever had.',
    'Close to Kamakura is an island called Enoshima, well-known for its local cuisine, folklore, and views of the Japanese coastline overlooking the Pacific Ocean. This picture was taken from a viewing deck at the very top of the island, looking across the bay at Japans western coast',
    'The previous picture was from the very top of Enoshima, while this was from the very bottom. Enoshima is riddled with deep caverns, many of which like this one hold shrines to ancient monks and folk heroes. One local legend has it the island itself was lifted out of the sea by an ancient dragon.',
    'This photo was taken in the city of Kyoto, at a mountain shrine called Fushimi Inari, dedicated to the god Inari. Inari was the patron deity of many things, including agriculture, commerce, wealth, and foxes. So statues of foxes were frequent throughout the shrine.',
    'Speaking of commerce, businesses in Japan still donate these bright vermillion gates, called Torii, to the Fushimi Inari shrine in the hopes of invoking Inari’s blessing. Given the shrine is more than a thousand years old, that’s a lot of businesses and a lot of gates!',
    'In the city proper I went to an art exhibition surrounding one of Japan’s unique art forms: Ikebana, the art of flower arrangement. Hundreds of beautiful plants arranged artfully and deliberately were on display.',
    'While the cities have much to see I tried to get outside of them as well. This was taken halfway up Mt. Kurama, which has a host of old stories and folklore associated with it. The famous fall colors were just starting to come in, so it was a gorgeous landscape to walk through (Though quite a lot of mountain hiking).',
    'In the city of Osaka, nowhere is more synonymous with food and entertainment than Dotonbori district. A cross between Times Square and the Fulton Fish Markets, it’s the best place to taste Osaka’s famous local cuisine.',
    'And speaking of, being a port city Osaka is famous for its crab. Crabs are everywhere in the city’s marketing, especially in a place like Dotonbori.',
    'A ways outside Osaka is the city of Himeji. Most famous for its castle, known also as the “White Heron Castle” due to its white walls and sweeping rooftops. The whole complex is seven UNESCO World Heritage Sites carefully preserved to show how it was when it was built in the early seventeenth century.',
    'Next to the castle (You can see some of the bailey rooftops in the background) are the stunning Koko-En gardens, a series of walled gardens dedicated to different natural themes. Here you can see the autumn colors starting to come in, with an actual heron standing to the right of the waterfall.',
    'A Hibiscus still in bloom in the gardens.',
    'One last temple to visit. This one is one of the oldest, so old that its founding is closer to legend than history. Called Sumiyoshi, it’s renowned for its association with both rabbits and protection for sailors and mariners, so walking through it reminded me of Dad and Mae.',
    'Eventually I made my way back to Tokyo and from there to the airport. But while riding the train from Osaka to Tokyo you could still see a stunning view of the famous Mount Fuji. It really was a fantastic trip, and one I intend to make again. Hopefully it won’t take me fourteen years this time.',
    ];

  const openLightbox = (image, text) => {
    setLightboxImage(image);
    setTextboxImage(text);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setTextboxImage(null);
  };
  
  const swiperRef = useRef();

  return (
    <CarouselStyles>
    <div className="title">Evan in Japan 2023</div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <div className='button-wrap prev'>
      <button onClick={() => swiperRef.current?.slidePrev()}>Prev</button></div>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="inner-wrap">
              <div className='counter'>{index + 1}</div>
              <div className="image-wrap">
                <div className="click-notice">Click to Englarge</div>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              onClick={() => openLightbox(image, texts[index])}
            /></div>
            <div className="text-wrap">{texts[index]}</div>
            </div>
          </SwiperSlide>
        ))}
        <div className='button-wrap next'>
        <button onClick={() => swiperRef.current?.slideNext()}>Next</button>
        </div>
      </Swiper>

      {lightboxImage && (
        <Lightbox onClick={closeLightbox}>
          <img className="lighbox-img" src={lightboxImage} alt="Lightbox" />
          <div className='lightbox-text'>{textboxImage}</div>
        </Lightbox>
      )}
    </CarouselStyles>
  );
};

export default ImageSlideshow;
