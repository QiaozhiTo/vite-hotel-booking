import React from 'react'
import { assets } from '../assets/assets'

const Bottom = () => {
  return (
    <div className='bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
        {/* upper */}
        <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
            <div className='max-w-80'>
                <img src={assets.logo} alt='logo' className='mb-4 h-8 md:h-9 invert opacity-80'></img>
                <p className='text-sm'>Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private islands.</p>
                <div className='flex items-center gap-3 mt-4'>
                    <img src={assets.instagramIcon} alt="ins-icon" className='w-6'></img>
                    <img src={assets.facebookIcon} alt="fb-icon" className='w-6'></img>
                    <img src={assets.twitterIcon} alt="x-icon" className='w-6'></img>
                    <img src={assets.linkendinIcon} alt="linkedin-icon" className='w-6'></img>
                </div>

            </div>

            <div>
                <p className='font-playfair text-lg text-gray-800'>COMPANY</p>
                <ul className='mt-3 flex flex-col gap-2 text-sm'>
                    <li>About</li>
                    <li>Careers</li>
                    <li>Press</li>
                    <li>Blog</li>
                    <li>Partners</li>
                </ul>
            </div>
            
            <div>
                <p className='font-playfair text-lg text-gray-800'>SUPPORT</p>
                <ul className='mt-3 flex flex-col gap-2 text-sm'>
                    <li>Help Center</li>
                    <li>Safety Information</li>
                    <li>Cancellation Options</li>
                    <li>Contact Us</li>
                    <li>Accessibility</li>
                </ul>


            </div>

            <div className='max-w-80'>
                <p className='font-playfair text-lg text-gray-800'>STAY UPDATED</p>
                <p>Subscribe to our newsletter for travel inspiration and special offers.</p>
                <div className='flex mt-4 items-center'>
                    <input placeholder='Your email' className='bg-white rounded-l border border-gray-300 h-9 px-3 outline-none'></input>
                    <button className='flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r'>
                        <img src={assets.arrowIcon} alt='arrow-icon' className='w-3.5 invert'></img>
                    </button>
                </div>

            </div>
            

        </div>

        {/* lower */}
        <hr className='border-gray-300 mt-8'></hr>
        <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
            <p>© 2025 QuickStay. All rights reserved.</p>
            <ul className='flex items-center gap-4'>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Sitemap</li>
            </ul>
        </div>

    </div>
  )
}

export default Bottom