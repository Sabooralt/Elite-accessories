import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';

// import required modules
import { Pagination,Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";

import 'swiper/swiper-bundle.css'; // Import Swiper styles
import SwiperCore from 'swiper/core'; // Import Swiper core and modules
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Example icons for navigation buttons
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { MdExpand, MdExpandLess } from "react-icons/md";

// Initialize Swiper modules

export default function ProductCarouselH() {
    const swiper = useSwiper();
    const slidesPerView = useBreakpointValue({base: 2, sm: 3 ,md: 3,lg:5 ,xl: 5})
  return (<>
<div className="custom-swiper-btns">
     
     <Box boxShadow={'customShadow'} bg={'primary'} className="custom-prev" onClick={()=>swiper.slidePrev()} >
     <MdExpandLess size={'3rem'} style={{rotate: '-90deg'}} color="#000" />
   </Box>
   <Box boxShadow={'customShadow'} bg={'primary'} className="custom-next"onClick={()=>swiper.slideNext()}>
     <MdExpandLess size={'3rem'} style={{rotate: '90deg'}} color="#000" />
   </Box>
    </div>
    <Swiper
      style={{
          background: "transparent",
          width: '100%',
          height: '100%'
      }}
    
      slidesPerView={slidesPerView}
      spaceBetween={30}
      navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
      
     modules={[Navigation]}
      className="mySwiper"
    >
      <SwiperSlide style={{ background: "transparent" }}>
   
        <ProductCard prize={500}>Red Leather Case</ProductCard>
      </SwiperSlide>
      <SwiperSlide style={{ background: "transparent" }}>
        <ProductCard prize={500}>Red Leather Case</ProductCard>
      </SwiperSlide>
      <SwiperSlide style={{ background: "transparent" }}>
        <ProductCard prize={500}>Red Leather Case</ProductCard>
      </SwiperSlide>
      <SwiperSlide style={{ background: "transparent" }}>
        <ProductCard prize={500}>Red Leather Case</ProductCard>
      </SwiperSlide>
      <SwiperSlide style={{ background: "transparent" }}>
        <ProductCard prize={500}>Red Leather Case</ProductCard>
      </SwiperSlide>
      <SwiperSlide style={{ background: "transparent" }}>
        <ProductCard prize={500}>Red Leather Case</ProductCard>
      </SwiperSlide>
      <SwiperSlide style={{ background: "transparent" }}>
        <ProductCard prize={500}>Red Leather Case</ProductCard>
      </SwiperSlide>


    </Swiper>
  </>

  );
}
