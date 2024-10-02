import React from 'react';
import style from './Footer.module.css';
// import payment from '../../assets/1.png';
// import googleplay from '../../assets/googleplay.png';
// import appstore from '../../assets/appstore.svg';
import appstore from "../../assets/appstore.svg.png"
import googleplay from "../../assets/googleplay.png"
import payment from "../../assets/1.png.png"

export default function Footer() {




    return (
    <>
        <footer className='p-5 bg-body-tertiary mt-5'>
            <h2>Get the FreshCart app</h2>
            <p className='text-secondary'>We will send you a link, open it on your phone to download the app</p>

            <div className="ms-4 border-bottom pb-4">
                <input type="text" className='inputEmail border' placeholder='Email..' />
                <button className='FooterBtn ms-4'>Share App Link</button>
            </div>


            <div className="row ms-4 mt-3 border-bottom pb-2">
                <div className="col-6">
                    <div className="d-flex align-items-md-center">
                        <span className='mb-2 me-3'>Payment Partnets</span>
                        <img src={payment} alt="" />
                    </div>
                </div>

                <div className="col-6">
                    <div className='text-end'>
                        <span className='me-3'>Get deliveries with FreshCart</span>
                        <img src={appstore} alt="" />
                        <img src={googleplay} alt="" />
                    </div>
                </div>
            </div>

        </footer>
    </>
)
}
