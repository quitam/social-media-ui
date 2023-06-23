import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

import styles from './Test.module.scss';

// import Swiper core and required modules
import { Navigation, EffectCards } from 'swiper';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

// install Swiper modules

const Test = () => {
    const btnNextClass = cx('swiper-custom-next');
    const btnPrevClass = cx('swiper-custom-prev');
    const disableClass = cx('swiper-button-disabled');
    return (
        <div className={cx('container')}>
            <div className={btnNextClass}>Next</div>
            <div className={btnPrevClass}>Prev</div>

            <Swiper
                effect="cards"
                style={{
                    '--swiper-navigation-color': '#000',
                    '--swiper-pagination-color': 'red',
                }}
                navigation={{ nextEl: `.${btnNextClass}`, prevEl: `.${btnPrevClass}`, disabledClass: disableClass }}
                modules={[Navigation, EffectCards]}
                className={cx('swiper')}
            >
                <SwiperSlide className={cx('swiper-slide')}>Slide 1</SwiperSlide>
                <SwiperSlide className={cx('swiper-slide')}>Slide 2</SwiperSlide>
                <SwiperSlide className={cx('swiper-slide')}>Slide 3</SwiperSlide>
                <SwiperSlide className={cx('swiper-slide')}>Slide 4</SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Test;
