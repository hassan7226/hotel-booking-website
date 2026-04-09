import React from 'react'
import Title from './Title'
import assets from '../assets/assets'
import { testimonials } from '../assets/assets'
import StarIconRating from './StarIconRating'

const Testimonails = () => {
  return (
    <div className='flex flex-col px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30'>
      <Title title='What Our Guests Say' subTitle='Discover the unforgettable experiences 
      of our guests at our luxurious hotels and resorts, where exceptional service and unforgettable moments await.' align='center' />

         <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-sm">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-1 mt-4">
                          <StarIconRating />
                        </div> 
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
      </div>
  )
}

export default Testimonails
