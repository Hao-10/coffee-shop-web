// 首頁-輪播圖片組件
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import styles from "../css/carousel.module.css";
import { motion } from "framer-motion";
import { imgPath } from "../utils/imgPath";

const Carousel = () => {
  const images = [
    "swiperslide1.jpg",
    "swiperslide2.jpg",
    "swiperslide3.jpg",
    "swiperslide4.jpg",
  ];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.centerText}>
        <h2>Morning<br/>Brew</h2>
        <p>SPECIALITY COFFEE HOUSE</p>
      </div>
        <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        loop={true}
        className={styles.mySwiper}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <motion.img src={imgPath(img)} alt={`slide-${index}`} className={styles.carouselimage} initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.8 }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;