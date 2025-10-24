import React from 'react'
import { testimonials } from '../assets/assets'
import Title from './Title'
import StarRating from './StarRating'

const Testimonial = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30'>
            {/* <p className=' text-4xl md:text-[40px] font-playfair text-center font-medium'>What Our Guests Say</p>
            <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Discover why discerning travelers choose QuickStay for their luxury accommodations around the world.</p> */}

            <Title title="What Our Guests Say" 
                subTitle="Discover why discerning travelers choose QuickStay for their luxury accommodations around the world."/>

        <div className='flex flex-wrap items-center gap-6 mt-20 '>
            {testimonials.map((item) => (

            <div key = {item.id} className=' bg-white p-6 rounded-xl shadow'>
                <div className='flex items-center gap-3'>
                    <img key = {item.id} src={item.image} className='w-12 h-12 rounded-full'></img>
                    <div>
                        <p className='font-playfair text-xl'>{item.name}</p>
                        <p className='text-gray-500'>{item.address}</p>
                    </div>
                </div>

                <div>
                     <div className="flex items-center gap-1 mt-4">
                           <StarRating />
                    </div>

                    <p className='flex items-center gap-1 mt-4'>{item.rating}</p>
                    <p className='text-gray-500 max-w-90 mt-4'>{item.review}</p>

                </div>
                
            </div>
            
            
        ))}


        </div>
        

    </div>
  )
}

export default Testimonial

{/* 
//  <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
//                 {testimonials.map((testimonial) => ( */}
{/* //                     <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs">
//                         <div className="flex items-center gap-3">
//                             <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
//                             <div>
//                                 <p className="font-playfair text-xl">{testimonial.name}</p>
//                                 <p className="text-gray-500">{testimonial.address}</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-1 mt-4">
                            // {Array(5).fill(0).map((_, index) => ( */}
{/* //                                 <Star key={index} filled={testimonial.rating > index} />
//                             ))}
//                         </div> */}
{/* //                         <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
//                     </div> */}
{/* //                 ))} */}