import React from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import slide1 from "../../assets/slider-image-1.jpeg"
import slide2 from "../../assets/slider-image-2.jpeg"
import slide3 from "../../assets/slider-image-3.jpeg"
import slide4 from "../../assets/grocery-banner-2.jpeg"
import slide5 from "../../assets/grocery-banner.png"

export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
    };


    return (
    <>
        <div className="row mt-4 gx-0">
            <div className="col-9">
                <Slider {...settings}>   
                    <div>
                        <img style={{height: "400px", objectFit: "cover"}} className='w-100' src={slide3} alt="" />
                    </div>
                    <div>
                        <img style={{height: "400px", objectFit: "cover"}} className='w-100' src={slide4} alt="" />
                    </div>
                    <div>
                        <img style={{height: "400px", objectFit: "cover"}} className='w-100' src={slide5} alt="" />
                    </div>
                </Slider>
            </div>
            <div className="col-3">
                <img style={{height: "200px", objectFit: "cover"}} className='w-100' src={slide2} alt="" />
                <img style={{height: "200px", objectFit: "cover"}} className='w-100' src={slide3} alt="" />
            </div>
        </div>

    </>
)
}
